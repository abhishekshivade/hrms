// server.js

const express = require('express');
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const dotenv = require('dotenv')

dotenv.config()
const port = process.env.PORT

// Import the MongoDB connection module
require('./mongoConnection');

// Import the Swagger documentation
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())

// Static directory path
app.use(express.static(path.join(__dirname, 'dist/HRMS-Front-End')))


// Import routes
const employeeRoutes = require('./employeeRoutes');

app.use(express.json());

// Use employee routes
app.use('/employees', employeeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('*', (_req, res) => {
  res.sendFile(
    path.join(__dirname, 'dist/HRMS-Front-End/index.html'),
  )
})