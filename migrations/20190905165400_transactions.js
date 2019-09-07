exports.up = function (knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.float('balance').notNullable();
    table
      .integer('categories_id')
      .references('id')
      .inTable('categories')
      .onDelete('cascade');
    table
      .integer('users_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    table.integer('type').unsigned();
    table.timestamp(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('transactions');
};
