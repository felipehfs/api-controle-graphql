const knex = require('../../config/db');

module.exports = {
  async register(_, { credentials }) {
    try {
      const { email, name, password } = credentials;
      const [id] = await knex('users').insert({ email, name, password }, 'id');
      const user = await knex
        .select('id', 'email', 'name')
        .from('users')
        .where({ id })
        .first();
      return user;
    } catch (err) {
      console.error(err);
      throw new Error(err.sqlMessage);
    }
  },
};
