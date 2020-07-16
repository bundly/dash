import passport from 'passport';
import usersController from './controller/usersController';
import { customAuthenticator } from './middlewares/authenticated';

const routes = router => {
    router.get('/', (req, res) => {
        res.send(`Api is Live -> Current Time: (${new Date()})`);
    });

    router.route('/auth/google/login').get(customAuthenticator);

    router.route('/auth/github/login').get(passport.authenticate('github'));

    router.route('/auth/discord/login').get(customAuthenticator);

    router.route('/auth/google/callback').get(passport.authenticate('google'), usersController.getOne);

    router.route('/auth/github/callback').get(passport.authenticate('github'), usersController.getOne);

    router.route('/auth/discord/callback').get(passport.authenticate('discord'), usersController.getOne);
};

export default routes;
