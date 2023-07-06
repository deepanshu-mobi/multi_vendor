const Customer = require('./customer');
const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const Order = require('./order')
const ProductVendorMapping = require('./product_vendor_mapping')
const ProductImage = require('./product_images');
const CustomerAccessToken = require('./customer_access_token');
const UserAccessToken = require('./user_access_token');
const CartProduct = require('./cartproducts');
const OrderProduct = require('./orderproducts');
const CustomerLocation = require('./customer_location');



//------------ Relationship mapping -------------------------------

User.hasMany(ProductVendorMapping, { foreignKey: 'vendorId'});
ProductVendorMapping.belongsTo(User, { foreignKey: 'vendorId'})
Product.hasMany(ProductVendorMapping, { foreignKey: 'productId' });
ProductVendorMapping.belongsTo(Product, { foreignKey: 'productId'})
Product.hasMany(ProductImage, { foreignKey: 'productId' });
User.hasMany(UserAccessToken, { foreignKey: 'userId' });
Customer.hasMany(CustomerAccessToken, { foreignKey: 'customerId' });
Customer.hasMany(Cart, { foreignKey: 'customerId' });
Customer.hasMany(Order, { foreignKey: 'customerId' });
Order.belongsTo(Customer, { foreignKey: 'customerId' });

Cart.hasMany(CartProduct, { foreignKey: 'cartId' });
CartProduct.belongsTo(Cart, { foreignKey: 'cartId' });
Product.hasMany(CartProduct, { foreignKey: 'productId' });
CartProduct.belongsTo(Product, { foreignKey: 'productId' });
Order.hasOne(OrderProduct, { foreignKey: 'orderId' });
OrderProduct.belongsTo(Order, { foreignKey: 'orderId' });
// Customer.hasMany(CustomerLocation, { foreignKey: 'customerId' });
// CustomerLocation.belongsTo(Customer, { foreignKey: 'customerId' });
Order.hasOne(CustomerLocation, { foreignKey: 'customerLocationId' });
CustomerLocation.belongsTo(Order, { foreignKey: 'customerLocationId' });

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
  CartProduct,
  OrderProduct,
  CustomerLocation,
}