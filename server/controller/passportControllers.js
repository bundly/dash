import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Strategy as DiscordStrategy } from 'passport-discord';

import User from '../models/usersModel';
import { callbackUrl } from '../env';

const discordScopes = ['identify', 'email', 'guilds', 'messages.read'];

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GH_CLIENT_ID,
            clientSecret: process.env.GH_CLIENT_SECRET,
            callbackURL: `${callbackUrl}/auth/github/callback`,
            scope: [
                'repo:status',
                'public_repo',
                'read:org',
                'notifications',
                'read:user',
                'user:email',
                'read:discussion'
            ]
        },
        async (accessToken, refreshToken, profile, cb) => {
            const username = profile.username;
            const duplicate = await User.findOne({ username }, { _id: 0 });

            if (duplicate) {
                let needsUpdate = false;
                duplicate.accounts.forEach(account => {
                    if (account.kind === 'github' && account.token.accessToken !== accessToken) {
                        needsUpdate = true;
                    }
                });

                if (needsUpdate) {
                    const updatedUser = await User.findOneAndUpdate(
                        {
                            username: duplicate.username,
                            'accounts.kind': 'github'
                        },
                        { $set: { 'accounts.$.token.accessToken': accessToken } },
                        { new: true, fields: { _id: 0 } }
                    );

                    return cb(null, updatedUser);
                }
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

            const registeredUser = await User.findOne(
                {
                    accounts: { $elemMatch: { kind: 'github', 'token.accessToken': token } }
                },
                { _id: 0 }
            );

            if (!registeredUser) {
                return cb(new Error('Error with GitHub Login. Token expired, login again'), null);
            }

            let needsUpdate = false,
                duplicate = false;
            registeredUser.accounts.forEach(account => {
                if (account.kind === 'discord') {
                    duplicate = true;
                    if (account.token.accessToken !== accessToken) {
                        needsUpdate = true;
                    }
                }
            });

            if (duplicate && needsUpdate) {
                const updatedUser = await User.findOneAndUpdate(
                    {
                        username: registeredUser.username,
                        'accounts.kind': 'discord'
                    },
                    { $set: { 'accounts.$.token.accessToken': accessToken } },
                    { new: true, fields: { _id: 0 } }
                );

                return cb(null, updatedUser);
            }

            if (duplicate) {
                return cb(null, registeredUser);
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
                    { new: true, fields: { _id: 0 } }
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
