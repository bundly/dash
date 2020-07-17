import jwt from 'jsonwebtoken';
import { API_KEY, hosts } from '../env';
import passport from '../controller/passportControllers';

export const customAuthenticator = (req, res, next) => {
    const { token } = req.query;
    if (!token) {
        throw new Error('Bad Request. Login with github first');
    }
    const state = token ? Buffer.from(JSON.stringify({ token })).toString('base64') : undefined;

    const authenticator = passport.authenticate('discord', { kind: 'github', state: state });

    authenticator(req, res, next);
};

export const authSuccess = (req, res) => {
    const data = {
        username: req.user.username,
        tokens: req.user.accounts
    };
    const token = Buffer.from(JSON.stringify(data)).toString('base64')
    res.redirect(`${hosts[0]}/#/auth?token=${token}`);
};

export const ensureAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
};
