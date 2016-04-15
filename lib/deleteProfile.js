var knex = require('./knex');

module.exports = function(userID) {
  //find the user entry and delete it
  return knex('users').where({id: userID}).del().then(function(){
    //go through listings and close them all based on the user_ID
    knex('listings').where({user_id: userID}).update({ closed: true }).then(function(){
      //set all notifications to displayed:true
      knex('notifications').where({user_id: userID}).update({ displayed: true }).then(function(){
        //set all transactions to ended by supplier_id
        knex('transactions').where({supplier_id: userID}).update({ ended: true });
      });
    });
  });






};
