import express from "express";
import {corsMiddleware, errorMiddleware} from "@app/middleware";

import { routes } from './routes';
import cookieParser = require('cookie-parser');

const app = express();

//Middleware
app.use(corsMiddleware);

app.use(express.json());
app.use(cookieParser());

//Routes
app.use(routes);

//Error Handler Middleware
app.use(errorMiddleware);

export {app};
export default app;
