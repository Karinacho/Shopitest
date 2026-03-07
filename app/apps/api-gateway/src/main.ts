import express from 'express';

import {corsMiddleware} from "./middleware/cors";
import {loggerMiddleware} from "./middleware/logger";
import {jsonParser, urlencodedParser, cookie} from "./middleware/parser";
import proxy from 'express-http-proxy';

import rateLimit from "express-rate-limit";
import swaggerUi from 'swagger-ui-express';
import axios from 'axios';


const app = express();

app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(jsonParser);
app.use(urlencodedParser);
app.use(cookie);
app.set('trust proxy', 1);

//Apply rate limit

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
