exports.up = function(knex, Promise) {
  return knex.schema.createTable('ratings', function(table) {
    table.increments('id');
    table.integer('reciever_id').unsigned().references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    table.integer('giver_id').unsigned().references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    table.integer('rating');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings');
};
