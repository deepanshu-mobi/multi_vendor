const customer = require('./customer');
const user = require('./user');
const product = require('./product');
const cart = require('./cart');
const order = require('./order')
const product_vendor_mapping = require('./product_vendor_mapping')

//------------ Relationship mapping -------------------------------
customer.hasMany(order, { foreignKey: 'customerId' });
product.hasMany(order, { foreignKey: 'productId' });
customer.hasMany(cart, { foreignKey: 'customerId' });
product.hasMany(cart, { foreignKey: 'productId' });

user.belongsTo(product,{through: product_vendor_mapping,foreignKey: 'userId'});
product.belongsTo(user,{through: product_vendor_mapping,foreignKey: 'productId'});




// module.exports = {
//   customer,
//   user,
//   product,
//   cart,
//   order,
//   product_vendor_mapping,
// }