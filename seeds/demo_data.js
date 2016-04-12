exports.seed = function(knex, Promise) {
  return Promise.join(
      knex('users').del(),
      knex('ratings').del(),
      knex('listings').del()
    )
    .then(function() {
      return Promise.join(
        knex('users').insert({
          email: 'milks@milks.com',
          password: 'password',
          phone: '(123)456-7890',
          portrait_link: 'http://www.newhealthadvisor.com/images/1HT00604/Glass-of-milk-2009.png',
          address_1: '123 Jeffrey Dahmer lane',
          address_2: 'Apt 13',
          city: 'Catfish Island',
          state: 'IN',
          zip_code: '47401',
          admin: true,
          verified: true
        }),
        knex('users').insert({
          email: 'happybaby@milks.com',
          password: 'password',
          phone: '(555)555-5555',
          portrait_link: 'http://i5.asn.im/baby-milk-jpg-_tz92.jpg',
          address_1: '123 Frank Zappa Road',
          address_2: '',
          city: 'Happyville',
          state: 'CO',
          zip_code: '80003',
          admin: true,
          verified: true
        }),
        knex('users').insert({
          email: 'iWantMilk@aol.com',
          password: 'milk',
          phone: '(800)123-1234',
          portrait_link: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/python_in_a_nutshell.jpg',
          address_1: '123 I Need Milk Lane',
          address_2: 'Please',
          city: 'Milktopia',
          state: 'New York',
          zip_code: '12345',
          admin: false,
          verified: false
        }),
        knex('users').insert({
          email: 'needMamaMilk@aol.com',
          password: 'milkem',
          phone: '(800)123-1234',
          portrait_link: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/python_in_a_nutshell.jpg',
          address_1: '123 I need that dairy',
          address_2: '',
          city: 'MamaMilk',
          state: 'Nevada',
          zip_code: '54321',
          admin: false,
          verified: false
        })
      );
    })
    .then(function() {
      return Promise.join(
        knex('ratings').insert({
          reciever_id: 1,
          giver_id: 2,
          rating: 5
        }),
        knex('ratings').insert({
          reciever_id: 2,
          giver_id: 4,
          rating: 3
        }),
        knex('ratings').insert({
          reciever_id: 3,
          giver_id: 1,
          rating: 4
        })
      );
    })
    .then(function() {
      return Promise.join(
        knex('listings').insert({
          user_id: 1,
          post_end: '4/21/2016',
          title: 'I have milk!',
          amount: 1,
          cost_per_ounce: 1,
          description: 'Organic and vegan!',
          requested: false
        }),
        knex('listings').insert({
          user_id: 2,
          post_end: '4/22/2016',
          title: 'Milk heeeer!',
          amount: 5,
          cost_per_ounce: 0,
          description: 'Great milk!',
          requested: true
        }),
        knex('listings').insert({
          user_id: 3,
          post_end: '4/20z/2016',
          title: 'Want my milk?',
          amount: 7,
          cost_per_ounce: 3,
          description: 'Great milk!',
          requested: true
        })
      );
    });
};
