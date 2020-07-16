import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Strategy as DiscordStrategy } from 'passport-discord';

import User from '../models/usersModel';
import { callbackUrl } from '../env';
import { logger } from '../middlewares';

const discordScopes = ['identify', 'email', 'guilds', 'messages.read'];

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `${callbackUrl}/auth/github/callback`
        },
        async (accessToken, refreshToken, profile, cb) => {
            const username = profile.username;
            const duplicate = await User.findOne({ username });

            if (duplicate) {
                return cb(null, duplicate);
            }

            try {
                const user = new User({
                    username: username,
                    githubProfile: profile,
                    accounts: [
                        {
                            kind: 'github',
                            uid: profile.id.toString(),
                            token: {
                                accessToken: accessToken
                                // No refershToken given with github
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
            callbackURL: `${callbackUrl}/auth/discord/callback`,
            scope: discordScopes,
            passReqToCallback: true
        },
        async (req, accessToken, refreshToken, profile, cb) => {
            const { state } = req.query;
            if (!state) {
                return cb(new Error('GitHub Login not found. Login with GitHub first'), null);
            }

            const { token } = JSON.parse(Buffer.from(state, 'base64').toString()); // token -> github access token

            if (typeof token !== 'string' || !token) {
                return cb(new Error('GitHub Login not found. Login with GitHub first'), null);
            }

            const registeredUser = await User.findOne({
                accounts: { $elemMatch: { kind: 'github', 'token.accessToken': token } }
            });

            if (!registeredUser) {
                return cb(new Error('Error with GitHub Login. Token expired, login again'), null);
            }

            try {
                const discordTokens = {
                    kind: 'discord',
                    token: {
                        accessToken,
                        refreshToken
                    }
                };
                const updatedUser = await User.findOneAndUpdate(
                    {
                        accounts: { $elemMatch: { kind: 'github', 'token.accessToken': token } }
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

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

export default passport;
