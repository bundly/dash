import passport from '../controller/passportControllers';
import jwt from 'jsonwebtoken';
import { API_KEY } from '../env';
import logger from './logger';

const authenticated = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, API_KEY, (err, _) => {
        if (err) {
            res.json('Token not provided');
        } else {
            next();
        }
    });
};

export const verifyToken = token => {
    try {
        const decoded = jwt.verify(token, API_KEY);
        return decoded;
    } catch {
        return false;
    }
};

export const customAuthenticator = (req, res, next) => {
    const { token } = req.query;
    if (!token) {
        throw new Error('Bad Request. Login with github first');
    }
    const state = token ? Buffer.from(JSON.stringify({ token })).toString('base64') : undefined;

    const authenticator = passport.authenticate('discord', { kind: 'github', state: state });

    authenticator(req, res, next);
};

export default authenticated;
