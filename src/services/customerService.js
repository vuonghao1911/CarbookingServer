const Customer = require("../modal/Customer");

const CustomerService = {
  addCustomer: async (customer) => {
    return await customer.save();
  },
  getCustomerById: async (_id) => {
    return await Customer.findById(_id);
  },
};

module.exports = CustomerService;
