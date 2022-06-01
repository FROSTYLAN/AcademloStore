const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const ProductImg = db.define('ProductImg', {
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
    defaultValue: 'active',
  },
});

module.exports = { ProductImg };
