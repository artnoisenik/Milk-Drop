var knex = require('./knex');

module.exports = function(userID, title, expiration_date, amount, cost_per_ounce, description) {
  return knex('listings')
    .insert({
      user_id: userID,
      title: title,
      post_end: expiration_date,
      amount: amount,
      cost_per_ounce: cost_per_ounce,
      description: description,
      requested: false,
      closed: false
    })
};
