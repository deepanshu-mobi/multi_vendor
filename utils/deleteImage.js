const fs = require('fs/promises')

const deleteImage = async (filePath)=>{
    
    try{
    await fs.unlink(filePath);
    return true
    }catch(err){
        console.log('Error while deleting image',err);
        return false
    }
}

module.exports = deleteImage;