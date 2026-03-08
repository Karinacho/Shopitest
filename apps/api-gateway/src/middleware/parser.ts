import express from 'express';
import cookieParser from 'cookie-parser';

export const jsonParser = express.json({ limit: '100mb' });
export const urlencodedParser = express.urlencoded({ limit: '100mb', extended: true });
export const cookie = cookieParser();
