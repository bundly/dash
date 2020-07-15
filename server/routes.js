import usersController from './controller/usersController';
import authController from './controller/authController';

const routes = router => {
    router.get('/', (req, res) => {
        res.send(`Api server in running (${new Date()})`);
    });

    router.route('/auth/google/login').post(authController.login);

    router.route('/auth/github/login').post(authController.login);

    router.route('/auth/discord/login').post(authController.login);

    router.route('/auth/google/callback').get(authController.register);

    router.route('/auth/github/callback').get(authController.register);

    router.route('/auth/discord/callback').get(authController.register);

    router.route('/auth/verify').post(authController.verify);

    router.route('/users').get(usersController.getAll).post(usersController.create);

    router.route('/users/:id').get(usersController.getOne).put(usersController.update).delete(usersController.delete);
};

export default routes;
