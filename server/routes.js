import passport from 'passport';
import usersController from './controller/usersController';
import { customAuthenticator, authSuccess } from './middlewares/authenticated';
import todoController from './controller/todoController';

function ensureAuthenticated(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
}

const routes = router => {
    router.get('/', (req, res) => {
        res.send(`Api is Live -> Current Time: (${new Date()})`);
    });

    router.route('/auth/verify').post(usersController.getOne);

    router.route('/todo').get(ensureAuthenticated, todoController.read);
    router.route('/todo').put(ensureAuthenticated, todoController.update);
    router.route('/todo').post(ensureAuthenticated, todoController.update);

    router.route('/auth/google/login').get(customAuthenticator);

    router.route('/auth/github/login').get(passport.authenticate('github'));

    router.route('/auth/discord/login').get(customAuthenticator);

    router.route('/auth/google/callback').get(passport.authenticate('google'), authSuccess);

    router.route('/auth/github/callback').get(passport.authenticate('github'), authSuccess);

    router.route('/auth/discord/callback').get(passport.authenticate('discord'), authSuccess);
};

export default routes;
