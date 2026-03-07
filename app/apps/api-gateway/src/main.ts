import express from 'express';

import { env } from './env';

import { corsMiddleware } from './middleware/cors';
import { loggerMiddleware } from './middleware/logger';
import { jsonParser, urlencodedParser, cookie } from './middleware/parser';
import {limiter} from "./middleware/rateLimit";

import proxy from 'express-http-proxy';


import swaggerUi from 'swagger-ui-express';
import axios from 'axios';


const app = express();

app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(jsonParser);
app.use(urlencodedParser);
app.use(cookie);
app.set('trust proxy', 1);

app.use(limiter)

app.get('/gateway-health', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

app.use('/', proxy('http://localhost:6001'))

const port = env.PORT;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

export {app};

export default app;
