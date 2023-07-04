const { Product, ProductImage } = require('../models');

const addingNewProduct = async (body) => {

    const { productName, description, price, image } = body;

    const product = await Product.create({
        productName,
        description,
        price,
    })

    if(image){
        image.map(async (item) => {
            await ProductImage.create({
                image: item.filename,
                productId: product.productId,
            })
        })
    }

    return product;
}

module.exports = {
    addingNewProduct,
}