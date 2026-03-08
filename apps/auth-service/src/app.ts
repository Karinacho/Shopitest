import express from "express";
import {corsMiddleware} from "@app/middleware";
import { routes } from './routes';

const app = express();

//Middleware
app.use(corsMiddleware);

//Routes
app.use(routes);

export {app};
export default app;
