import { FastifySchema } from "fastify";
import { OrderStatus } from "../../types/database";

export const createOrderSchema: FastifySchema = {
    body: {
      type: 'object',
      required: ['customerId', 'details', 'total'],
      properties: {
        customerId: { type: 'string', format: 'uuid' },
        details: { type: 'string' },
        orderTotal: { type: 'number', minimum: 0, maximum: 1000 },
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          customerId: { type: 'string', format: 'uuid' },
          details: { type: 'string' },
          status: { type: 'string' },
          total: { type: 'number' },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time', nullable: true },
        }
      },
      500: {
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    }
  };

export const getOrdersSchema: FastifySchema = {
    querystring: {
      type: 'object',
      required: ['customerId'],
      properties: {
        customerId: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            customerId: { type: 'string' },
            details: { type: 'string' },
            status: { type: 'string' },
            total: { type: 'number' },
          },
        },
      },
      500: {
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
};

export const updateOrderSchema: FastifySchema = {
    params: {
      type: 'object',
      required: ['orderId', 'details', 'status'],
      properties: {
        orderId: { type: 'string' },
      },
    },
    body: {
      type: 'object',
      properties: {
        customerId: { type: 'string' },
        details: { type: 'string' },
        status: { type: 'string', enum: Object.values(OrderStatus) },
      },
      required: ['customerId', 'details', 'status'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          customerId: { type: 'string' },
          details: { type: 'string' },
          status: { type: 'string' },
          total: { type: 'number' },
        },
      },
      404: {
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
      500: {
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
};