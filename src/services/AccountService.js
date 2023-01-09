const Account = require("../modal/Account");

const AccountService = {
  saveAccount: async (account) => {
    return await account.save();
  },

  checklogin: async (passWord, phoneNumber) => {
    return await Account.findOne({
      $and: [{ phoneNumber: phoneNumber }, { passWord: passWord }],
    });
  },

  checkRegister: async (phoneNumber) => {
    return await Account.findOne({
      phoneNumber: phoneNumber,
    });
  },
};

module.exports = AccountService;
