const { Product, ProductImage, ProductVendorMapping, User } = require('../models');

const addingNewProduct = async (body, email) => {

    const { productName, description, price, image } = body;

    const product = await Product.create({
        productName,
        description,
        price,
    })

    await ProductImage.create({
        image,
        productId: product.productId,
    })

    const user = await User.findOne({ where: { email } });
    if(user){
        await ProductVendorMapping.create({
            productId:product.productId,    
            vendorId: user.userId
        })
    }
    return product;
}

module.exports = {
    addingNewProduct,
}