const knex = require('../../config/db');

module.exports = {
  allCategories() {
    return knex('categories');
  },
  async findCategory(_, { name }) {
    try {
      const category = await knex('categories')
        .where({ name })
        .first();
      return category;
    } catch (err) {
      console.error(err);
      throw new Error(err.sqlMessage);
    }
  },
};
