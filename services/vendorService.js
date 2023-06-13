const { User } = require('../models')
const bcrypt = require('bcryptjs')

const registerVendor = async (body) => {

    const { name, email, password, phoneNo } = body;
    const hashPassword = bcrypt.hashSync(password, 8)
    const vendor = await User.create({
        name,
        email,
        phoneNo,
        password: hashPassword
    })
    return vendor;
}