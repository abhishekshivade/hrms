// swagger.js

const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee Management API',
      version: '1.0.0',
      description: 'API for managing employees',
    },
    servers: [
      {
        url:"https://hrmsserver.onrender.com" || 'http://localhost:4000', // Update with your server's URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./employeeRoutes.js'], // Path to your route file(s)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
