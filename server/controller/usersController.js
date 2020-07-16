import jwt from 'jsonwebtoken';
import { API_KEY, hosts } from '../env';

const usersController = {
    getOne: (req, res, _) => {
        const data = {
            username: req.user.username,
            tokens: req.user.accounts
        };
        const token = jwt.sign({ data }, API_KEY);
        res.redirect(`${hosts[0]}/#/auth?token=${token}`);
    }
};

export default usersController;
