import passport from 'passport';
import GitHubStrategy from 'passport-github';
import DiscordStrategy from 'passport-discord';

import User from '../models/usersModel';

const discordScopes = ['identify', 'email', 'guilds', 'messages.read'];

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: 'https://bundly.tech/api/auth/github/callback'
        },
        async (accessToken, refreshToken, profile, cb) => {
            const username = profile.username;
            const duplicate = await User.findOne({ username });

            if (duplicate) {
                return cb(null, duplicate);
            }

            try {
                const user = new User({
                    username: profile.login, // login is the username
                    githubProfile: profile,
                    accounts: [
                        {
                            type: 'github',
                            uid: profile.id,
                            token: {
                                accessToken: accessToken,
                                refreshToken: refreshToken
                            }
                        }
                    ],
                    commits: 0
                });

                await user.save();
                return cb(null, user);
            } catch (err) {
                return cb(err, null);
            }
        }
    )
);

passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: 'https://bundly.tech/api/auth/discord/callback',
            scope: discordScopes
        },
        async (req, accessToken, refreshToken, profile, cb) => {
            const githubAccessToken = req.githubAccessToken;
            const registeredUser = await User.findOne({
                accounts: { $elemMatch: { type: 'github', 'token.access_token': githubAccessToken } }
            });

            if (!registeredUser) {
                return cb('GitHub Login not found. Login with GitHub first', null);
            }

            try {
                const discordTokens = {
                    type: 'discord',
                    token: {
                        accessToken,
                        refreshToken
                    }
                };
                const updatedUser = await User.findOneAndUpdate(
                    {
                        accounts: { $elemMatch: { type: 'github', 'token.access_token': githubAccessToken } }
                    },
                    { discordProfile: profile, $push: { accounts: discordTokens } },
                    { new: true }
                );
                
                return cb(null, updatedUser);
            } catch (err) {
                return cb(err, null);
            }
        }
    )
);
