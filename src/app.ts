import fastify from 'fastify';
import dbConnector from './database';

const server = fastify();

server.register(dbConnector);

server.listen({ port: 3000 })
  .then((address) => console.log(`Server running at ${address}`))
  .catch((err) => console.error(err));

export default server;