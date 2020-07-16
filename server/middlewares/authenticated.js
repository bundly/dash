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
    return res.json({
        success: true,
        data: req.user
    });
};
