const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const ProductInCart = db.define('productInCart', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  cartId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
});

module.exports = { ProductInCart };
