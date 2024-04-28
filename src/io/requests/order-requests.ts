import { FastifyRequest } from "fastify";

export interface CreateOrderRequest extends FastifyRequest {
    Body: {
        customerId: string;
        details: string;
        total: number
    }
}

export interface GetOrdersByCustomerIdRequest extends FastifyRequest {
    Querystring: {
      customerId: string;
    };
}

export interface UpdateOrderRequest extends FastifyRequest {
    Params: {
      orderId: string;
    };
    Body: {
      customerId: string;
      details: string;
      status: string;
    };
}