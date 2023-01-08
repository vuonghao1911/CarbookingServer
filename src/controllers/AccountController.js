const AccountService = require("../services/AccountService");
const EmployeeService = require("../services/EmployeeService");
const CustomerService = require("../services/customerService");
const Account = require("../modal/Account");
const Employee = require("../modal/Employee");
const Customer = require("../modal/Customer");
const { checklogin } = require("../services/AccountService");

class AccountController {
  async Register(req, res, next) {
    const {
      role,
      phoneNumber,
      passWord,
      firstName,
      lastName,
      address,
      typeId,
    } = req.body;
    //console.log(number);

    var newAccount;

    try {
      if (role) {
        const employee = new Employee({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          typeId: typeId,
          address: address,
        });
        const { _id } = await EmployeeService.saveEmployee(employee);
        const account = new Account({
          phoneNumber: phoneNumber,
          passWord: passWord,
          role: role,
          idUser: _id,
        });
        newAccount = await AccountService.saveAccount(account);
      } else {
        const customer = new Customer({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
        });
        const { _id } = await CustomerService.addCustomer(customer);
        const account = new Account({
          phoneNumber: phoneNumber,
          passWord: passWord,
          role: role,
          idUser: _id,
        });
        newAccount = await AccountService.saveAccount(account);
      }

      return res.json(newAccount);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async Login(req, res, next) {
    const { phoneNumber, passWord } = req.body;

    try {
      const account = await AccountService.checklogin(passWord, phoneNumber);

      var user;
      if (account == null) {
        res.json({ checklogin: false });
      } else {
        if (account.role) {
          const employee = await Employee.findById(account.idUser);
          console.log("employee", employee);

          user = { user: employee, role: account.role, checklogin: true };
        } else {
          const customer = await Customer.findById(account.idUser);
          user = { user: customer, role: account.role, checklogin: true };
          console.log("employee", customer);
        }
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AccountController();
