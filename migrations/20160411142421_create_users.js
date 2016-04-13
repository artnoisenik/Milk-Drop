exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('password');
    table.string('phone');
    table.string('portrait_link');
    table.string('address_1');
    table.string('address_2');
    table.string('city');
    table.string('state');
    table.integer('zip_code');
    table.decimal('latitude', 20, 10);
    table.decimal('longitude', 20, 10);
    table.boolean('admin');
    table.boolean('verified');
    table.string('facebook_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
