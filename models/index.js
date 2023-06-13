const Customer = require('./customer');
const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const Order = require('./order')
const ProductVendorMapping = require('./product_vendor_mapping')

//------------ Relationship mapping -------------------------------
// Customer.hasMany(Order, { foreignKey: 'customerId' });
// Product.hasMany(Order, { foreignKey: 'productId' });
// Customer.hasMany(Cart, { foreignKey: 'customerId' });
// Product.hasMany(Cart, { foreignKey: 'productId' });

User.belongsTo(Product,{through: ProductVendorMapping,foreignKey: 'userId'});
Product.belongsTo(User,{through: ProductVendorMapping,foreignKey: 'productId'});




module.exports = {
  Customer,
  User,
  Product,
  Cart,
  Order,
  ProductVendorMapping,
}