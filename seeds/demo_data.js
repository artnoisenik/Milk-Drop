exports.seed = function(knex, Promise) {
  return Promise.join(
      knex('users').del(),
      knex('ratings').del(),
      knex('listings').del()
    )
    .then(function() {
      return Promise.join(
        knex('users').insert({
          first_name: 'Brad',
          last_name: 'Butterfield',
          email: 'brad@admin.com',
          password: 'password',
          phone: '(123)456-7890',
          portrait_link: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Mickey_Mouse.png',
          address_1: '1015 Pearl St',
          address_2: '',
          city: 'Boulder',
          state: 'CO',
          zip_code: '80302',
          latitude: 40.1742733000,
          longitude: -105.2444810000,
          admin: true,
          verified: true
        }),
        knex('users').insert({
          first_name: 'Billy',
          last_name: 'Bob',
          email: 'happybaby@milks.com',
          password: 'password',
          phone: '(555)555-5555',
          portrait_link: 'http://i5.asn.im/baby-milk-jpg-_tz92.jpg',
          address_1: '1521 Pearl St',
          address_2: '',
          city: 'Boulder',
          state: 'CO',
          zip_code: '80302',
          latitude: 40.1742753000,
          longitude: -105.2444610000,
          admin: false,
          verified: false
        }),
        knex('users').insert({
          first_name: 'Sally',
          last_name: 'Sue',
          email: 'iWantMilk@aol.com',
          password: 'password',
          phone: '(800)123-1234',
          portrait_link: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/python_in_a_nutshell.jpg',
          address_1: '1035 Walnut St',
          address_2: 'Apt 123',
          city: 'Boulder',
          state: 'CO',
          zip_code: '80302',
          latitude: 32.1742433000,
          longitude: -100.2445010000,
          admin: false,
          verified: false
        }),
        knex('users').insert({
          first_name: 'Jeff',
          last_name: 'Dean',
          email: 'needMamaMilk@aol.com',
          password: 'password',
          phone: '(800)123-1234',
          portrait_link: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/python_in_a_nutshell.jpg',
          address_1: '1605 Folsom St',
          address_2: 'Lower',
          city: 'Boulder',
          state: 'CO',
          zip_code: '80302',
          latitude: 40.1741833000,
          longitude: -82.2444810000,
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
        }),
        knex('ratings').insert({
          reciever_id: 4,
          giver_id: 3,
          rating: 2
        })
      );
    })
    .then(function() {
      return Promise.join(
        knex('listings').insert({
          user_id: 1,
          post_end: '5/7/2016',
          title: 'Organic breast milk!',
          amount: 200,
          cost_per_ounce: 3,
          description: 'Great quality organic and vegan breast milk for sale.',
          requested: false
        }),
        knex('listings').insert({
          user_id: 2,
          post_end: '5/12/2016',
          title: 'Free milk!',
          amount: 5,
          cost_per_ounce: 0,
          description: 'Great milk!',
          requested: true
        }),
        knex('listings').insert({
          user_id: 3,
          post_end: '5/20/2016',
          title: 'Extra milk for sale!',
          amount: 7,
          cost_per_ounce: 3,
          description: 'Lots of milk!',
          requested: true
        }),
        knex('listings').insert({
          user_id: 4,
          post_end: '5/16/2016',
          title: 'Contact for milk.',
          amount: 7,
          cost_per_ounce: 3,
          description: 'Very high quality milk!',
          requested: true
        })
      );
    });
};
