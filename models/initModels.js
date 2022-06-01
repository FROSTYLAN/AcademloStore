const { User } = require('./user.model');
const { Cart } = require('./cart.model');
const { Category } = require('./category.model');
const { Order } = require('./order.model');
const { Product } = require('./product.model');
const { ProductImg } = require('./productImg.model');
const { ProductInCart } = require('./productInCart.model');

const initModels = () => {
  // 1 User <---> M Order
  User.hasMany(Order);
  Order.belongsTo(User);

  // 1 User <---> 1 Cart
  User.hasOne(Cart);
  Cart.belongsTo(User);

  // 1 User <---> M Product
  User.hasMany(Product);
  Product.belongsTo(User);

  // 1 Product <---> M ProductImg
  Product.hasMany(ProductImg);
  ProductImg.belongsTo(Product);

  // 1 Product <---> 1 ProductsInCart
  Product.hasOne(ProductInCart);
  ProductInCart.belongsTo(Product);

  // 1 Cart <---> M productsInCart
  Cart.hasMany(ProductInCart);
  ProductInCart.belongsTo(Cart);

  // 1 Cart <---> 1 Order
  Cart.hasOne(Order);
  Order.belongsTo(Cart);

  // 1 Category <---> 1 Product
  Category.hasOne(Product);
  Product.belongsTo(Category);
};

module.exports = { initModels };
