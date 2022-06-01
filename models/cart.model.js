const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Cart = db.define('cart', {
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
  status: {
    type: DataTypes.STRING,
    defaultValue: 'available',
  },
});

module.exports = { Cart };
