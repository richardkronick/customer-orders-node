import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { createOrderSchema, getOrdersSchema, updateOrderSchema } from '../../schemas/order-schemas';
import { CreateOrderRequest, GetOrdersByCustomerIdRequest, UpdateOrderRequest } from '../../requests/order-requests';
import { OrderStatus } from '../../../types/database';

/* TODO:
    - Use something like the sqlite package to make db interaction async
    - Add logging and potentially some alerts
    - Add API documentation such as Swagger
    - Use an auth token for authentication and authorization
    - Use an order details object (see /types/database.ts) instead of string
    - Add validation to ensure that the number of items ordered is in fact in stock and handle a shortage
    - Account for sales taxes
    - Add TypeScript more types where valuable
    - Maybe add /types/business.ts to represent the dto objects
    - Move database queries into a separate file
    -- Add nodemon for local development
*/
async function orderRoutes(fastify: FastifyInstance) {
  
  // Create an order
  fastify.post('/orders', { schema: createOrderSchema }, async (request: FastifyRequest<CreateOrderRequest>, reply: FastifyReply) => {
    try {
      const { customerId, details, total } = request.body;
      const db = fastify.sqlite.db;
      console.log('sqllite', fastify.sqlite)
      const orderId = uuidv4();

      db.run('INSERT INTO orders (id, customerId, details, status, total) VALUES (?, ?, ?, ?, ?)', orderId, customerId, details, OrderStatus.Pending, total);

      const createdOrder = db.get('SELECT * FROM orders WHERE id = ?', orderId);
      
      reply.status(201).send(createdOrder);
    } catch (error) {
      reply.status(500).send({ error: `Unable to create order: Error details: ${(error as Error)?.message}` });
    }
  });


  // Get all orders by customerId
  fastify.get('/orders', { schema: getOrdersSchema }, async (request: FastifyRequest<GetOrdersByCustomerIdRequest>, reply: FastifyReply) => {
    try {
      const { customerId } = request.query;
      const db = fastify.sqlite.db;

      const orders = db.all('SELECT * FROM orders WHERE customerId = ?', customerId);
      
      reply.send(orders);
    } catch (error) {
      reply.status(500).send({ error: `Unable to retrieve orders. Error details: ${(error as Error)?.message}` });
    }
  });

  // Update an order (including cancelling)
  fastify.put('/orders/:orderId', {schema: updateOrderSchema }, async (request: FastifyRequest<UpdateOrderRequest>, reply: FastifyReply) => {
    try {
      const { orderId } = request.params;
      const { customerId, details, status } = request.body;
      const db = fastify.sqlite.db;

      const order = db.get('SELECT * FROM orders WHERE id = ?', orderId);
      if (!order) {
        reply.status(404).send({ error: 'Order not found' });
        return;
      }

      const stmt = db.prepare('UPDATE orders SET customerId = ?, details = ?, status = ? WHERE id = ?');
      stmt.run(customerId, details, status, orderId);
      const updatedOrder = db.get('SELECT * FROM orders WHERE id = ?', orderId);

      reply.send(updatedOrder);
    } catch (error) {
      reply.status(500).send({ error: `Unable to update order. Error details: ${(error as Error)?.message}` });
    }
  });
}

export default orderRoutes;
