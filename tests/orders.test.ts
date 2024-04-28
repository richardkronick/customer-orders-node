import server from '../src/app';
import { OrderStatus } from '../src/types/database';

const CUSTOMER_ID = 'some-uuid-for-customer';
const ORDER_ID = 'some-uuid-for-order';
const NON_EXISTENT_ORDER_ID = 'non-existent-uuid';
const ORDER_TO_CANCEL_ID = 'some-uuid-for-order-to-cancel';

/*
    TDOD - Add the following tests:
        - Attempting to create an order without all required paramters
        - Confirm that created order indeed does have the expected details
        - Test for getting orders by an invalid customer id
        - Add a 'get order by orderId' endpoint and use in the 'update order' test to see before and after the update
*/
describe('Orders integration tests', () => {
    test('Create a simple order', async () => {
        const orderData = {
            customerId: CUSTOMER_ID,
            details: 'Some example order details',
            total: 100.00
        };
        const response = await server.inject({
            method: 'POST',
            url: '/orders',
            payload: orderData
        });

        expect(response.statusCode).toBe(201);
        expect(JSON.parse(response.body)).toHaveProperty('id');
    });

    test('Get orders by customerId', async () => {
            const response = await server.inject({
            method: 'GET',
            url: `/orders?customerId=${CUSTOMER_ID}`
        });

        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(Array.isArray(body)).toBe(true);
        if (body.length > 0) {
            expect(body[0]).toHaveProperty('customerId', CUSTOMER_ID);
        }
    });

    test('Update an order', async () => {
        const updateData = {
            customerId: CUSTOMER_ID,
            details: 'Updated order details here',
            status: OrderStatus.Complete
        };
        const response = await server.inject({
            method: 'PUT',
            url: `/orders/${ORDER_ID}`,
            payload: updateData
        });

        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(body).toHaveProperty('id', ORDER_ID);
        expect(body).toHaveProperty('status', OrderStatus.Complete);
    });

    test('Update Non-existent Order', async () => {
        const updateData = {
            customerId: CUSTOMER_ID,
            details: 'Random details',
            status: OrderStatus.Processing
        };
        const response = await server.inject({
            method: 'PUT',
            url: `/orders/${NON_EXISTENT_ORDER_ID}`,
            payload: updateData
        });

        expect(response.statusCode).toBe(404);
        expect(JSON.parse(response.body)).toHaveProperty('error');
    });

    test('Cancel an order', async () => {
        const cancelData = {
            customerId: CUSTOMER_ID,
            details: 'Random details',
            status: OrderStatus.Cancelled
        };
        const response = await server.inject({
            method: 'PUT',
            url: `/orders/${ORDER_TO_CANCEL_ID}`,
            payload: cancelData
        });

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toHaveProperty('status', OrderStatus.Cancelled);
    });
});

afterAll(() => {
  server.close();
});