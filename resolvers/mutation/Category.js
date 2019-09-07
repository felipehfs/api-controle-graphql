const knex = require('../../config/db');

module.exports = {
  async createCategory(_, { name }) {
    try {
      const [id] = await knex('categories').insert({ name }, 'id');
      const category = await knex('categories')
        .where({ id })
        .first();

      return category;
    } catch (err) {
      console.error(err);
      throw new Error(err.sqlMessage);
    }
  },
  async updateCategory(_, { query, data }) {
    try {
      const category = await knex('categories')
        .where({ id: query.id })
        .first();

      if (category) {
        await knex('categories')
          .where({ id: query.id })
          .update({ name: data.name });
      }

      return { ...category, ...data };
    } catch (err) {
      console.error(err);
      throw new Error(err.sqlMessage);
    }
  },
  async removeCategory(_, { query }) {
    try {
      const category = await knex('categories')
        .where({ id: query.id })
        .first();

      if (category) {
        await knex('categories')
          .where({ id: query.id })
          .del();
      }

      return category;
    } catch (err) {
      console.error(err);
      throw new Error(err.sqlMessage);
    }
  },
};
