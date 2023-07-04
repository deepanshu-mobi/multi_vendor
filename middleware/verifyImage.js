
const isValidImage = (value, {req}) => {

    const images = req.files;
    images.forEach((file) => {
        if(!file || !file.filename){
        throw new Error('Image file is required')
        }
        if(!file.mimetype.startsWith('image/')){
            throw new Error('Only image file is allowed')
        }
    });
    return true
}

module.exports = {
    isValidImage
}

