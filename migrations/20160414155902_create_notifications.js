// notifications
// user_id
// message (accepted - rejected)
// transaction_id foreign key?

exports.up = function(knex, Promise) {
  return knex.schema.createTable('notifications', function(table) {
    table.increments('id');
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    table.integer('listing_id').unsigned().notNullable().references('id').inTable('listings');
    table.string('message', 500);
    table.boolean('displayed');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notifications');
};
