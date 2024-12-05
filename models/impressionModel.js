const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config'); // Use the sequelize instance from db-config.js

const Impression = sequelize.define('Impression', {
  adId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Impression;
