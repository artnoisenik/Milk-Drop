var knex = require('./knex');

module.exports = function() {
  return knex('listings')
    .join('ratings', 'reciever_id', 'listings.user_id')
    .join('users', 'users.id', 'listings.user_id')
};
