const customer = require('./customer');
const user = require('./user');
const product = require('./product');
const cart = require('./cart');
const order = require('./order')
const productVendorMapping = require('./product_vendor_mapping')

//------------ Relationship mapping -------------------------------
customer.hasMany(order, { foreignKey: 'customerId' });
product.hasMany(order, { foreignKey: 'productId' });
customer.hasMany(cart, { foreignKey: 'customerId' });
product.hasMany(cart, { foreignKey: 'productId' });

user.belongsTo(product,{through: productVendorMapping,foreignKey: 'userId'});
product.belongsTo(user,{through: productVendorMapping,foreignKey: 'productId'});




module.exports = {
  customer,
  user,
  product,
  cart,
  order,
  productVendorMapping,
}