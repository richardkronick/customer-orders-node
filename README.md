# Customer Orders API

This is a simple API for managing customer orders.

## Features

- Create a new order
- Get all orders for a specific customer
- Update/cancel an existing order

## Prerequisites

- Node.js
- npm
  
## Built With

- [Fastify](https://www.fastify.io/): Web framework for Node.js
- [SQLite](https://www.sqlite.org/index.html): Database engine

## API Endpoints

* POST /orders: Create a new order
* GET /orders?customerId={customerId}: Get all orders for a specific customer
* PUT /orders/{orderId}: Update/cancel an existing order
