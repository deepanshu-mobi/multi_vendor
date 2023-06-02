const customer = require('./customer');
const vendor = require('./vendor');
const admin = require('./admin');
const product = require('./product');
const cart = require('./cart');
const order = require('./order')
const product_vendor_ids = require('./product_vendor_ids')

//------------ Relationship mapping -------------------------------
customer.hasMany(order, { foreignKey: 'customerId' });
product.hasMany(order, { foreignKey: 'productId' });
customer.hasMany(cart, { foreignKey: 'customerId' });
product.hasMany(cart, { foreignKey: 'productId' });

vendor.belongsTo(product,{through: product_vendor_ids,foreignKey: 'vendorId'});
product.belongsTo(vendor,{through: product_vendor_ids,foreignKey: 'productId'});




module.exports = {
  customer,
  vendor,
  admin,
  product,
  cart,
  order,
  product_vendor_ids,
}