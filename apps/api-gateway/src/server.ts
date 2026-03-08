// server.ts — http lifecycle only
import { app } from './app';
import { env } from './env';

const server = app.listen(env.PORT, () => {
  console.log(`Listening at http://localhost:${env.PORT}/api`);
});

server.on('error', console.error);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export { server };
