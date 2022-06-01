const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Product = db.define('product', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
  },
  categoryId: {
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

module.exports = { Product };
