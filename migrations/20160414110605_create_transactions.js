exports.up = function(knex, Promise) {
  return knex.schema.createTable('transactions', function(table) {
    table.increments('id');
    table.integer('supplier_id').unsigned().notNullable().references('id').inTable('users');
    table.integer('requester_id').unsigned().notNullable().references('id').inTable('users');
    table.integer('listing_id').unsigned().notNullable().references('id').inTable('listings');
    table.boolean('requested');
    table.boolean('accepted');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('transactions');
};
