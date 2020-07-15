import './database/db';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { handleError, logger } from './middlewares';
import passport from './controller/passportControllers';
import { API_PORT, hosts } from './env';

const app = express();

app.use(cors({ origin: hosts, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.use((err, _req, res, _) => {
    handleError(err, res);
});

app.listen(API_PORT, () => {
    logger.info(`Api listening on port ${Number(API_PORT)}!`);
});
