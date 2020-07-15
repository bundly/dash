import './database/db';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

import { handleError, authenticated, logger } from './middlewares';
import { API_PORT, hosts } from './env';

const app = express();

app.use(cors({ origin: hosts, credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/auth');
app.use('/users', authenticated);

routes(app);

app.use((err, _req, res, _) => {
    handleError(err, res);
});

app.listen(API_PORT, () => {
    logger.info(`Api listening on port ${Number(API_PORT)}!`);
});
