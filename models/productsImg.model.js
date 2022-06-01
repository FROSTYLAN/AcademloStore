const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const productsImg = db.define('ProductsImg', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  imgUrl: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'available',
  },
});

module.exports = { productsImg };
