const Customer = require('./customer');
const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const Order = require('./order')
const ProductVendorMapping = require('./product_vendor_mapping')
const ProductImage = require('./product_images');
const CustomerAccessToken = require('./customer_access_token');
const UserAccessToken = require('./user_access_token');



//------------ Relationship mapping -------------------------------
// Customer.hasMany(Order, { foreignKey: 'customerId' });
// Product.hasMany(Order, { foreignKey: 'productId' });
// Customer.hasMany(Cart, { foreignKey: 'customerId' });
// Product.hasMany(Cart, { foreignKey: 'productId' });

User.hasMany(ProductVendorMapping, { foreignKey: 'vendorId'});
ProductVendorMapping.belongsTo(User, { foreignKey: 'vendorId'})
Product.hasMany(ProductVendorMapping, { foreignKey: 'productId' });
ProductVendorMapping.belongsTo(Product, { foreignKey: 'productId'})
Product.hasMany(ProductImage, { foreignKey: 'productId' })




module.exports = {
  Customer,
  User,
  Product,
  Cart,
  Order,
  ProductVendorMapping,
  ProductImage,
  CustomerAccessToken,
  UserAccessToken,
}