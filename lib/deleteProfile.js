var knex = require('./knex');

module.exports = function(user_id) {
  return knex('users').where({id: user_id}).del()
    }).returning('id')
    .then(function(user) {
      return knex('ratings').insert({ reciever_id: user[0] }).returning('reciever_id')
    }).then(function(id) {
      return knex('users').where({ id: id[0] }).first()
    })
};
