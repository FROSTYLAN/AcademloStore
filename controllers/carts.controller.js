// Models
const { Cart } = require('../models/cart.model');
const { ProductInCart } = require('../models/productInCart.model');
const { Product } = require('../models/product.model');
const { Order } = require('../models/order.model');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const getUserCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
    include: [
      {
        model: ProductInCart,
        required: false,
        where: { status: 'active' },
        include: [{ model: Product }],
      },
    ],
  });

  res.status(200).json({ status: 'success', cart });
});

const addProductToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { sessionUser } = req;

  const product = await Product.findOne({ where: { id: productId } });

  if (!product) {
    return next(new AppError('Invalid product', 404));
  } else if (quantity > product.quantity) {
    return next(
      new AppError(
        `This product only has ${product.quantity} items available`,
        400
      )
    );
  }

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
  });

  if (!cart) {
    const newCart = await Cart.create({ userId: sessionUser.id });

    await ProductInCart.create({ cartId: newCart.id, productId, quantity });
  } else {
    const productInCart = await ProductInCart.findOne({
      where: { cartId: cart.id, productId, status: 'removed' },
    });

    if (productInCart) {
      await productInCart.update({ quantity, status: 'active' });
    } else {
      const productInCart = await ProductInCart.findOne({
        where: { cartId: cart.id, productId, status: 'active' },
      });
      if (productInCart) {
        return next(
          new AppError('You already have that product in your cart', 400)
        );
      } else {
        await ProductInCart.create({ cartId: cart.id, productId, quantity });
      }
    }
  }

  res.status(200).json({ status: 'success' });
});

const updateProductInCart = catchAsync(async (req, res, next) => {
  const { newQty, productId } = req.body;
  const { sessionUser } = req;

  const cart = await Cart.findOne({
    where: { status: 'active', userId: sessionUser.id },
  });

  if (!cart) {
    return next(new AppError('Must create a cart first', 400));
  }

  const productInCart = await ProductInCart.findOne({
    where: { status: 'active', cartId: cart.id, productId },
    include: [{ model: Product }],
  });

  if (!productInCart) {
    return next(new AppError('This product does not exist in your cart', 404));
  }

  if (newQty < 0 || newQty > productInCart.product.quantity) {
    return next(
      new AppError(
        `Invalid selected quantity, this product only has ${productInCart.product.quantity} items available`,
        400
      )
    );
  }

  if (newQty === 0) {
    await productInCart.update({ quantity: 0, status: 'removed' });
  } else if (newQty > 0) {
    await productInCart.update({ quantity: newQty });
  }

  res.status(200).json({ status: 'success' });
});

const purchaseCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  let totalPrice = 0;

  const cart = await Cart.findOne({
    where: { status: 'active', userId: sessionUser.id },
    include: [
      {
        model: ProductInCart,
        required: false,
        where: { status: 'active' },
        include: [{ model: Product }],
      },
    ],
  });

  if (!cart) {
    return next(new AppError('Must create a cart first', 400));
  }

  const cartPromises = cart.productInCarts.map(async productInCart => {
    const newQuantity = productInCart.product.quantity - productInCart.quantity;
    await productInCart.product.update({ quantity: newQuantity });

    const productPrice = productInCart.quantity * +productInCart.product.price;
    totalPrice += productPrice;

    return await productInCart.update({ status: 'purchased' });
  });

  await Promise.all(cartPromises);

  await cart.update({ status: 'purchased' });

  const newOrder = await Order.create({
    userId: sessionUser.id,
    cartId: cart.id,
    totalPrice,
  });

  res.status(200).json({ status: 'success', newOrder });
});

const removeProductFromCart = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const { sessionUser } = req;

  const cart = await Cart.findOne({
    where: { status: 'active', userId: sessionUser.id },
  });

  if (!cart) {
    return next(new AppError('Must create a cart first', 400));
  }

  const productInCart = await ProductInCart.findOne({
    where: { status: 'active', cartId: cart.id, productId },
    include: [{ model: Product }],
  });

  await productInCart.update({ quantity: 0, status: 'removed' });
  res.status(200).json({ status: 'success' });
});

module.exports = {
  addProductToCart,
  updateProductInCart,
  purchaseCart,
  removeProductFromCart,
  getUserCart,
};
