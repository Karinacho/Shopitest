import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //time window 15 min
  limit: (req) => (req?.user ? 1000 : 100),
  message: {error: "Too many requests, please try again later"},
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req) => req.user?.id ?? ipKeyGenerator(req.ip ?? req.socket.remoteAddress ?? '')
});
