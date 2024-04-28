import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    sqlite: {
      db: import('sqlite3').Database;
    };
  }
}
