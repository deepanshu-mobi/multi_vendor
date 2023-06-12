const { User } = require('../models')

const adminLogin = async (body) => {

    const { email } = body
    const user = await User.findOne({ where: { email }})
    return user
}

module.exports = {
    adminLogin,
}