const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Order = db.define('order', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  cartId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  totalPrice: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
});

module.exports = { Order };
