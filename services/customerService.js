const { Customer, CustomerAccessToken, Cart, CartProduct, Product } = require("../models");
const bcrypt = require("bcryptjs");
const serverConfig = require("../config/server.config");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendEmail");

const createCustomer = async (body) => {
  const { name, email, password, phoneNo } = body;
  const hashPassword = bcrypt.hashSync(password, 8);

  const customer = await Customer.create({
    name,
    email,
    phoneNo,
    password: hashPassword,
  });
  const token = jwt.sign({ id: customer.customerId }, serverConfig.SECRET, {
    expiresIn: 120,
  }); // 2 min
  const updateCustomer = await customer.update({ token });
  sendEmail(email, token);
  return updateCustomer;
};

const loginCustomer = async (body) => {
  const { email } = body;
  const user = await Customer.findOne({ where: { email } });
  return user;
};

const customerAccessTokenTable = async (body) => {
  let { customerId, token, deviceType } = body;
  const mixId = customerId + (Math.floor(Math.random() * 1000) + 1);

  if (deviceType.includes("Mobile")) {
    deviceType = "Mobile";
  } else if (deviceType.includes("Tablet")) {
    deviceType = "Tablet";
  } else {
    deviceType = "Desktop";
  }
  const tokenBody = await CustomerAccessToken.create({
    customerId,
    token,
    deviceType,
    deviceId: mixId,
  });
  return tokenBody;
};

const updateProductQuantity = async (body, email) => {

  const { productId, quantity } = body;
  const { customerId } = await Customer.findOne({ where: { email } });
  const customerCart = await Cart.findOne({ where: { customerId }, include: { model: CartProduct, where: { productId }, include: { model: Product, attributes: ['price']}}});
  const product = customerCart.cart_products[0]
  let customerCartUpdated;
  if(quantity > product.quantity) {
    await CartProduct.update({quantity, price: product.Product.price * quantity }, { where: { cartId: customerCart.cartId, productId: product.productId }});
  }else if(quantity < product.quantity && !quantity == 0){
    await CartProduct.update({quantity, price: product.Product.price * quantity }, { where: { cartId: customerCart.cartId, productId: product.productId }});
    customerCartUpdated = await Cart.findOne({ where: { customerId }, include: { model: CartProduct, where: { productId } }});
  }
  else if(quantity == product.quantity){
    return 
  }

  return customerCartUpdated;
}

module.exports = {
  createCustomer,
  loginCustomer,
  customerAccessTokenTable,
  updateProductQuantity,
};
