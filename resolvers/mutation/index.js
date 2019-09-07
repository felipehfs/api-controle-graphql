const category = require('./Category');
const user = require('./user');
const transaction = require('./Transaction');

module.exports = {
  ...category,
  ...user,
  ...transaction,
};
