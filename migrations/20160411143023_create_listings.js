exports.up = function(knex, Promise) {
  return knex.schema.createTable('listings', function(table) {
    table.increments('id');
    table.integer('user_id').unsigned();
    table.timestamp('created_at').defaultTo(knex.raw('now()')).notNullable();
    table.timestamp('updated_at').defaultTo(knex.raw('now()')).notNullable();
    table.string('post_end');
    table.string('title');
    table.integer('amount');
    table.integer('cost_per_ounce');
    table.text('description');
    table.boolean('requested');
    table.boolean('closed');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('listings');
};
