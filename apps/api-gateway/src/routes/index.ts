import { Router } from 'express';
import proxy from 'express-http-proxy';

export const routes = Router();

routes.get('/gateway-health', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

routes.use('/', proxy('http://localhost:6001'))
