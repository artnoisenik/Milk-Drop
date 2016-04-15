var knex = require('./knex');

module.exports = function(listingID) {
  //find the user listing and close it
  return knex('listings').where({id: listingID}).update({closed: true});
};
