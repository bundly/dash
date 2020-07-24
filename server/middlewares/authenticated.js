import { hosts } from '../env';
import passport from '../controller/passportControllers';
import User from '../models/usersModel';
import { ErrorHandler } from './error';

export const customAuthenticator = async (req, res, next) => {
    try {
        const token = req?.query?.token;
        if (!token) {
            throw new ErrorHandler(401, 'Bad Request. Login with github first');
        }
        const state = token ? Buffer.from(JSON.stringify({ token })).toString('base64') : undefined;

        const registeredUser = await User.findOne(
            {
                accounts: { $elemMatch: { kind: 'github', 'token.accessToken': token } }
            },
            { _id: 0 }
        );

        if (!registeredUser) {
            throw new ErrorHandler(500, 'Error with GitHub Login. Token expired, login again');
        }

        const authenticator = passport.authenticate('discord', { kind: 'discord', state: state });

        authenticator(req, res, next);
    } catch (err) {
        next(err);
    }
};

export const authSuccess = (req, res) => {
    const data = {
        username: req.user.username,
        tokens: req.user.accounts,
        avatar: req.user.githubProfile._json.avatar_url
    };
    const token = Buffer.from(JSON.stringify(data)).toString('base64');
    res.redirect(`${hosts[0]}/#/auth?token=${token}`);
};

export const ensureAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
};
