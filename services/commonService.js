const { CustomerLocation, Customer, User } = require('../models');
const constant = require('../utils/constant')

const findAllLocationsOfCustomer = async (email, id) => {


    const customer = await Customer.findOne({ where: { email } });
    const user = await User.findOne({ where: { email } });
    
    if(customer){
        const customerLocations = await CustomerLocation.findAll({ where: { customerId: customer.customerId }});
        if(!customerLocations || customerLocations.length === 0){
            return { message: 'Customer does not have any prefered location' }
        }
        return customerLocations;
    }
    if( user && user.role != constant.UserType.VENDOR){
        if(id){
            const customerLocations = await CustomerLocation.findAll({ where: { customerId: id }});
            if(!customerLocations || customerLocations.length === 0){
                return { message: 'Customer does not have any prefered location' }
            }
            return customerLocations;
        }
        else{
            return { message: 'customerId is not provided in the params' }
        }
    }
}

module.exports = {
    findAllLocationsOfCustomer,
}
