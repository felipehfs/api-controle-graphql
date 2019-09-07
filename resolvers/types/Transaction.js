const knex = require('../../config/db');

module.exports = {
  category(transaction) {
    return knex('categories')
      .where({ id: transaction.categories_id })
      .first();
  },
  owner(transaction) {
    return knex('users')
      .select('id', 'email', 'name')
      .where({ id: transaction.users_id })
      .first();
  },
};
