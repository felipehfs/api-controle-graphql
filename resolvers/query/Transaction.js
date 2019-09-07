const knex = require('../../config/db');

module.exports = {
  allTransactions() {
    return knex('transactions');
  },
  async findTransaction(_, { id }) {
    const transaction = await knex('transactions')
      .where({ id })
      .first();
    const category = await knex('categories')
      .where({ id: transaction.categories_id })
      .first();
    const owner = await knex('users')
      .where({ id: transaction.users_id })
      .first();

    return { ...transaction, category, owner };
  },
};
