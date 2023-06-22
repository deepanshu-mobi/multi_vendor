const { Product, ProductImage } = require('../models');

const addingNewProduct = async (body) => {

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

    return product;
}

module.exports = {
    addingNewProduct,
}