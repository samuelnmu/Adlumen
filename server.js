const express = require('express');
const bodyParser = require('body-parser');
const adRoutes = require('./routes/adRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const logger = require('./utils/logger');
const { fetchWalletInfo } = require('./services/lightningService');

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Print .env variables on startup
console.log('Loaded Environment Variables:');
console.log('==============================');
Object.keys(process.env).forEach((key) => {
  console.log(`${key}: ${process.env[key]}`);
});
console.log('==============================');

// Routes
app.use('/api/ads', adRoutes); // API routes to have prefix /api
app.use('/api/payments', paymentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await fetchWalletInfo(); // Test the Lightning Network connection
    logger.info(`Server running on http://localhost:${PORT}`);
  } catch (error) {
    logger.error('Error connecting to the Lightning node:', error);
    process.exit(1); // Exit process if Lightning connection fails
  }
});
