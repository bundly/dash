import passport from 'passport';
import GitHubStrategy from 'passport-github';

import User from '../models/usersModel';

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
                    profile: profile,
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
            } catch (err) {
                return cb(err, null);
            }
        }
    )
);
