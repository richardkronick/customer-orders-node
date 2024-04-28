import fastifyPlugin from 'fastify-plugin';
import * as sqlite3 from 'sqlite3';
import { FastifyInstance } from 'fastify';
import orders from './io/api-routes/orders';

const dbConnector = async (fastify: FastifyInstance) => {
  await fastify.register(require('fastify-sqlite'), {
    driver: sqlite3.Database,
    database: './ordersdb.sqlite'
  });

  fastify.register(orders);
};

export default fastifyPlugin(dbConnector);