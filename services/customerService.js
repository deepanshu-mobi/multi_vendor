const { Customer, CustomerAccessToken, Cart, CartProduct, Product, CustomerLocation } = require("../models");
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

const addNewLocation = async (body, email) => {

  const { locationName, pin, isPrimary, country, city, state } = body;

  const { customerId } = await Customer.findOne({ where: { email } });

  const customerLocations = await CustomerLocation.findAll({ where: { customerId } });
  let locationWithPin = false
  if(customerLocations.length != 0){
    customerLocations.forEach((item) => {
      if(locationName == item.locationName && pin == item.pin){
        locationWithPin = true
      }
    })
    console.log(locationWithPin)
    if(locationWithPin === true){
      return { message: 'location name with this pin exist already' }
    }
  }
  if(isPrimary == 1) {
    if(customerLocations){
      customerLocations.forEach(async (item) => {
        if(item.isPrimary == 1){
          await item.update({isPrimary: 0})
        }
      })
      const customerLocation = await CustomerLocation.create({
        locationName,
        pin,
        isPrimary,
        country,
        city,
        state,
        customerId
    })
    
    return customerLocation
    }
  }
  const customerLocation = await CustomerLocation.create({
    locationName,
    pin,
    isPrimary,
    country,
    city,
    state,
    customerId
})
  return customerLocation;
}

const updateCustomerLocation = async (body, email , customerLocationId) => {

    //edit location;
    const { customerId } = await Customer.findOne({ where: { email } })
    let  customerLocation = await CustomerLocation.findOne({ where: { customerId, customerLocationId }})
    const { locationName, pin, isPrimary, country, city, state } = body;
    const updateBody = {
      locationName, 
      pin, 
      isPrimary, 
      country, 
      city, 
      state
    }
    if(isPrimary == 1) {
      const customerLocations = await CustomerLocation.findAll({ where: { customerId } });
      if(customerLocations){
        customerLocations.forEach(async (item) => {
          if(item.isPrimary == 1){
            await item.update({isPrimary: 0})
          }
        })
      await customerLocation.update(updateBody)
      customerLocation = await CustomerLocation.findOne({ where: { customerId, customerLocationId }});
      return customerLocation;
      }
    }
    await customerLocation.update(updateBody)
    customerLocation = await CustomerLocation.findOne({ where: { customerId, customerLocationId }});
    return customerLocation;
}

const deleteLocationOfCustomer = async (customerLocationId, email) => {

  const { customerId } = await Customer.findOne({ where: { email }})
  const customerLocation = await CustomerLocation.destroy({ where: { customerId, customerLocationId }});
  if(!customerLocation){
    return { message: 'location \doesn\'t exist' }
  }
  return customerLocation;
}

module.exports = {
  createCustomer,
  loginCustomer,
  customerAccessTokenTable,
  updateProductQuantity,
  addNewLocation,
  updateCustomerLocation,
  deleteLocationOfCustomer,
};
