const knex = require('../../config/db');
const { findCategory } = require('../query/Category');
const { findTransaction } = require('../query/Transaction');

module.exports = {
  async createTransaction(_, { data }) {
    try {
      const category = await findCategory(_, { name: data.category });
      const owner = await knex('users')
        .select('id', 'name', 'email')
        .where({ id: data.owner })
        .first();

      const newTransaction = { ...data };
      if (owner) {
        newTransaction.users_id = owner.id;
      }

      if (category) {
        newTransaction.categories_id = category.id;
      }

      delete newTransaction.category;
      delete newTransaction.owner;
      delete owner.password;
      const [id] = await knex('transactions').insert(
        newTransaction,
        'id',
      );

      const transaction = await knex('transactions')
        .where({ id })
        .first();
      return transaction;
    } catch (err) {
      console.error(err);
      throw new Error(err.sqlMessage);
    }
  },
  async removeTransaction(_, args) {
    try {
      const transaction = await findTransaction(_, args);
      if (transaction) {
        await knex('transactions')
          .where(args)
          .del();
      }
      return transaction;
    } catch (err) {
      console.error(err);
      throw new Error(err.sqlMessage);
    }
  },
  async updateTransaction(_, { data, id }) {
    try {
      const category = await findCategory(_, { name: data.category });
      const owner = await knex('users')
        .where({ id: data.owner })
        .first();

      const newCategory = { ...data };
      if (category) {
        newCategory.categories_id = category.id;
      }

      if (owner) {
        newCategory.users_id = owner.id;
      }

      delete newCategory.category;
      delete newCategory.owner;

      await knex('transactions')
        .where({ id })
        .update(newCategory, 'id');
      const transaction = await findTransaction(_, { id });
      return transaction;
    } catch (err) {
      console.error(err);
      throw new Error(err.sqlMessage);
    }
  },
};
