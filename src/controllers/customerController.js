const customerService = require("../services/customerService");
const Customer = require("../modal/Customer");
class CustomerController {
  async addCustomer(req, res, next) {
    const { firstName, lastName, phoneNumber } = req.body;
    //console.log(number);
    try {
      const customer = new Customer({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      });

      const savecustomer = await customerService.addCustomer(customer);
      console.log(savecustomer);
      return res.json(savecustomer);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getCustomerById(req, res, next) {
    const { userId } = req.params;
    console.log(userId);

    try {
      const customer = await Customer.findById(userId);

      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
  async getCustomer(req, res, next) {
    try {
      const customer = await Customer.aggregate([
        {
          $lookup: {
            from: "tickets",
            localField: "_id",
            foreignField: "customerId",
            as: "tickets",
          },
        },
        {
          $project: {
            _id: "$_id",
            firstName: "$firstName",
            lastName: "$lastName",
            phoneNumber: "$phoneNumber",
            quantityTicket: { $size: "$tickets" },
          },
        },
      ]);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  async updateInfo(req, res, next) {
    const { firstName, lastName, phoneNumber, id } = req.body;
    //console.log(number);
    try {
      await Customer.updateOne(
        { _id: id },
        {
          $set: {
            lastName: lastName,
            firstName: firstName,
            phoneNumber: phoneNumber,
          },
        }
      );
      console.log(true);
      return res.json(true);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new CustomerController();
