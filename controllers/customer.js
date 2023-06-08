const customerService = require('../services/customerService')
const { Customer } = require('../models')


exports.register = async(req, res) => {
    
    const { email } = req.body
    const user = await Customer.findOne({ where: { email } }) ;
    if(user){
        return res.render('customer', { formData: req.body, errorMessage: 'Email already exist'})
    }
    const customer = await customerService.createCustomer(req.body)
}