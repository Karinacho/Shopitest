import cors from 'cors';

export const corsMiddleware = cors({
  origin: ['http://localhost:3000'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
});
