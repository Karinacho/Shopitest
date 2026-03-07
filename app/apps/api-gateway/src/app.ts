//app.ts - pure express setup, no server logic / express app setup, middleware, routes
import express from 'express';
import { corsMiddleware } from '@app/middleware';
import { loggerMiddleware } from './middleware/logger';
import { jsonParser, urlencodedParser, cookie } from './middleware/parser';
import {limiter} from "./middleware/rateLimit";
import { routes } from './routes';
import env from "./env";

const app = express();

//Trust proxy
app.set('trust proxy', env.TRUST_PROXY);

//Middleware
app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(jsonParser);
app.use(urlencodedParser);
app.use(cookie);
// app.use(authMiddleware); // ← populates req.user ✅ TODO
app.use(limiter)

//Routes
app.use(routes);

export {app};
export default app;
