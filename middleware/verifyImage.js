
const isValidImage = (value, {req}) => {

    if(!req.file || !req.file.filename){
        throw new Error('Image file is required')
    }

    const image = req.file
    if(!image.mimetype.startsWith('image/')){
        throw new Error('Only image file is allowed')
    }
    return true
}

module.exports = {
    isValidImage
}

