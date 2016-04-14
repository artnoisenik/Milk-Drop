var bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return Promise.join(
      knex('users').del(),
      knex('ratings').del(),
      knex('listings').del()
    )
    .then(function() {
      return Promise.join(
        knex('users').insert({
          first_name: 'Kim',
          last_name: 'Gordon',
          email: 'kim@admin.com',
          password: bcrypt.hashSync('password', 10),
          phone: '(123)456-7890',
          portrait_link: 'http://s3.amazonaws.com/quietus_production/images/articles/17757/kimpaintings1_1430047128_crop_550x354.jpg',
          address_1: '10 Unreal Ave',
          address_2: '',
          city: 'Boulder',
          state: 'CO',
          zip_code: '80302',
          latitude: 39.987709,
          longitude: -105.173492,
          admin: false,
          verified: true
        }),
        knex('users').insert({
          first_name: 'Michelle',
          last_name: 'Fyffe',
          email: 'mike@admin.com',
          password: bcrypt.hashSync('password', 10),
          phone: '(123)456-7890',
          portrait_link: 'http://i.telegraph.co.uk/multimedia/archive/03173/baby_3173961b.jpg',
          address_1: '1015 Fake St',
          address_2: '',
          city: 'Boulder',
          state: 'CO',
          zip_code: '80302',
          latitude: 39.971792,
          longitude: -105.255117,
          admin: true,
          verified: true
        }),
        knex('users').insert({
          first_name: 'Mary',
          last_name: 'Smith',
          email: 'cooper@admin.com',
          password: bcrypt.hashSync('password', 10),
          phone: '(123)456-7890',
          portrait_link: 'http://dreamatico.com/data_images/mother/mother-8.jpg',
          address_1: '789 Never Ln',
          address_2: '',
          city: 'Boulder',
          state: 'CO',
          zip_code: '80302',
          latitude: 40.038589,
          longitude: -105.282326,
          admin: true,
          verified: true
        }),
        knex('users').insert({
          first_name: 'Bridget',
          last_name: 'Mumps',
          email: 'brad@admin.com',
          password: bcrypt.hashSync('password', 10),
          phone: '(123)456-7890',
          portrait_link: 'http://www.miscw.com/wp-content/uploads/2016/02/Mother.jpg',
          address_1: '123 Boomer St',
          address_2: '',
          city: 'Boulder',
          state: 'CO',
          zip_code: '80302',
          latitude: 40.026891,
          longitude: -105.233831,
          admin: true,
          verified: true
        }),
        knex('users').insert({
          first_name: 'Molly',
          last_name: 'Stagger',
          email: 'happybaby@milks.com',
          password: bcrypt.hashSync('password', 10),
          phone: '(555)555-5555',
          portrait_link: 'http://respectwomen.co.in/wp-content/uploads/2014/01/mother-and-girl-child.jpeg',
          address_1: '1521 Newborn St',
          address_2: '',
          city: 'Boulder',
          state: 'CO',
          zip_code: '80302',
          latitude: 40.023802,
          longitude: -105.276403,
          admin: false,
          verified: false
        }),
        knex('users').insert({
          first_name: 'Sally',
          last_name: 'Sue',
          email: 'iWantMilk@aol.com',
          password: bcrypt.hashSync('password', 10),
          phone: '(800)123-1234',
          portrait_link: 'http://bcira.com/wp-content/uploads/2014/11/temporary-profile-placeholder.jpg',
          address_1: '1035 Walnut St',
          address_2: 'Apt 123',
          city: 'Boulder',
          state: 'CO',
          zip_code: '80302',
          latitude: 32.1742433000,
          longitude: -100.2445010000,
          admin: false,
          verified: true
        }),
        knex('users').insert({
          first_name: 'Ashley',
          last_name: 'Dean',
          email: 'needMamaMilk@aol.com',
          password: bcrypt.hashSync('password', 10),
          phone: '(800)123-1234',
          portrait_link: 'http://i.huffpost.com/gen/3527860/thumbs/o-BREASTMILK-570.jpg?7',
          address_1: '1605 Folsom St',
          address_2: 'Lower',
          city: 'Boulder',
          state: 'CO',
          zip_code: '80302',
          latitude: 40.1741833000,
          longitude: -82.2444810000,
          admin: false,
          verified: false
        }),
        knex('users').insert({
          first_name: 'Sylvia',
          last_name: 'Mistletoe',
          email: 'boom@aol.com',
          password: bcrypt.hashSync('password', 10),
          phone: '(800)123-1234',
          portrait_link: 'http://cdn2.momjunction.com/wp-content/uploads/2014/10/Expressing-Breast-Milk-By-Hand.jpg',
          address_1: '35 Moose St',
          address_2: 'Apt 222',
          city: 'Fairbanks',
          state: 'AK',
          zip_code: '000001',
          latitude: 64.838101,
          longitude: -147.721052,
          admin: false,
          verified: true
        }),
        knex('users').insert({
          first_name: 'Frankie',
          last_name: 'Pennyworth',
          email: 'frank@aol.com',
          password: bcrypt.hashSync('password', 10),
          phone: '(800)432-1034',
          portrait_link: 'https://pmcvariety.files.wordpress.com/2014/05/breastmilk.jpg?w=670&h=377&crop=1',
          address_1: '1243 Canada Ave',
          address_2: '',
          city: 'Fairbanks',
          state: 'AK',
          zip_code: '000001',
          latitude: 64.824705,
          longitude: -147.639427,
          admin: false,
          verified: false
        }),
        knex('users').insert({
          first_name: 'Carol',
          last_name: 'Bread',
          email: 'carol@aol.com',
          password: bcrypt.hashSync('password', 10),
          phone: '(999)555-8394',
          portrait_link: 'http://2.everyday-families.com/wp-content/uploads/2010/03/switching-from-breast-milk-or-formula-to-cows-milk1.jpg',
          address_1: '222 South St',
          address_2: '',
          city: 'Fairbanks',
          state: 'AK',
          zip_code: '000001',
          latitude: 64.835364,
          longitude: -147.810402,
          admin: true,
          verified: true
        }),
        knex('users').insert({
          first_name: 'Gina',
          last_name: 'Davis',
          email: 'carol@aol.com',
          password: bcrypt.hashSync('password', 10),
          phone: '(999)555-8394',
          portrait_link: 'http://rack.3.mshcdn.com/media/ZgkyMDEyLzEyLzA0L2EzLzIwc2l0ZXNldmVyLmJmRS5qcGcKcAl0aHVtYgk5NTB4NTM0IwplCWpwZw/57e66d82/da8/20-sites-every-cool-mom-should-know-6d6e6a48dd.jpg',
          address_1: '22 North St',
          address_2: '',
          city: 'Fairbanks',
          state: 'AK',
          zip_code: '000001',
          latitude: 64.814918,
          longitude: -147.716331,
          admin: true,
          verified: true
        }),
        knex('users').insert({
          first_name: 'Sharon',
          last_name: 'Brown',
          email: 'sharon@aol.com',
          password: bcrypt.hashSync('password', 10),
          phone: '(999)555-5555',
          portrait_link: 'https://pbs.twimg.com/profile_images/665733874685726720/dE5E7W0j.jpg',
          address_1: '523 Peace Ln',
          address_2: '',
          city: 'Fairbanks',
          state: 'AK',
          zip_code: '000001',
          latitude: 64.810388,
          longitude: -147.787743,
          admin: false,
          verified: false
        }),
        knex('users').insert({
          first_name: 'Carla',
          last_name: 'Moore',
          email: 'carla@aol.com',
          password: bcrypt.hashSync('password', 10),
          phone: '(555)555-5555',
          portrait_link: 'http://img2.timeinc.net/people/i/2016/news/160404/angry-mom-1-800.jpg',
          address_1: '9399 St. Martin Ave',
          address_2: 'Apt 234',
          city: 'Fairbanks',
          state: 'AK',
          zip_code: '000001',
          latitude: 64.805566,
          longitude: -147.696075,
          admin: false,
          verified: false
        })
      );
    })
    .then(function() {
      return Promise.join(
        knex('ratings').insert({
          reciever_id: 1,
          giver_id: 4,
          rating: 5
        }),
        knex('ratings').insert({
          reciever_id: 2,
          giver_id: 3,
          rating: 3
        }),
        knex('ratings').insert({
          reciever_id: 3,
          giver_id: 2,
          rating: 4
        }),
        knex('ratings').insert({
          reciever_id: 4,
          giver_id: 1,
          rating: 2
        }),
        knex('ratings').insert({
          reciever_id: 5,
          giver_id: 3,
          rating: 4
        }),
        knex('ratings').insert({
          reciever_id: 6,
          giver_id: 1,
          rating: 0
        }),
        knex('ratings').insert({
          reciever_id: 7,
          giver_id: 6,
          rating: 2
        }),
        knex('ratings').insert({
          reciever_id: 8,
          giver_id: 5,
          rating: 4
        }),
        knex('ratings').insert({
          reciever_id: 9,
          giver_id: 6,
          rating: 2
        }),
        knex('ratings').insert({
          reciever_id: 10,
          giver_id: 1,
          rating: 3
        }),
        knex('ratings').insert({
          reciever_id: 11,
          giver_id: 10,
          rating: 4
        }),
        knex('ratings').insert({
          reciever_id: 12,
          giver_id: 3,
          rating: 5
        }),
        knex('ratings').insert({
          reciever_id: 13,
          giver_id: 7,
          rating: 4
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
          requested: false,
          closed: false
        }),
        knex('listings').insert({
          user_id: 2,
          post_end: '5/12/2016',
          title: 'Free milk!',
          amount: 5,
          cost_per_ounce: 0,
          description: 'Great milk!',
          requested: true,
          closed: false
        }),
        knex('listings').insert({
          user_id: 3,
          post_end: '5/20/2016',
          title: 'Extra milk for sale!',
          amount: 7,
          cost_per_ounce: 3,
          description: 'Lots of milk!',
          requested: true,
          closed: false
        }),
        knex('listings').insert({
          user_id: 4,
          post_end: '5/16/2016',
          title: 'Contact for milk.',
          amount: 7,
          cost_per_ounce: 3,
          description: 'Very high quality milk!',
          requested: true,
          closed: false
        }),
        knex('listings').insert({
          user_id: 5,
          post_end: '12/7/2016',
          title: 'Extra milk!',
          amount: 10,
          cost_per_ounce: 0,
          description: 'I have some extra milk. Trying to give to someone in need. Request if this is you!',
          requested: false,
          closed: false
        }),
        knex('listings').insert({
          user_id: 6,
          post_end: '1/7/2018',
          title: 'Milk! Milk! Milk!',
          amount: 23,
          cost_per_ounce: 2,
          description: 'Looking to sell some extra milk at a good price.',
          requested: true,
          closed: false
        }),
        knex('listings').insert({
          user_id: 7,
          post_end: '1/7/2018',
          title: 'Milk supply',
          amount: 900,
          cost_per_ounce: 4,
          description: 'My baby is into solid food now. Looking to get rid of the extra I saved up over the last couple of months. Thanks!',
          requested: false,
          closed: false
        }),
        knex('listings').insert({
          user_id: 8,
          post_end: '7/21/2017',
          title: 'Milk',
          amount: 3,
          cost_per_ounce: 1,
          description: 'Just a few ounces extra this week. Hoping to get rid of it to a good home. Thanks.',
          requested: false,
          closed: false
        }),
        knex('listings').insert({
          user_id: 9,
          post_end: '11/30/2016',
          title: 'I have milk!',
          amount: 20,
          cost_per_ounce: 3,
          description: 'I have 100% organic milk. That means I only eat 100% organic food!',
          requested: true,
          closed: false
        }),
        knex('listings').insert({
          user_id: 10,
          post_end: '9/19/2018',
          title: 'Milk for free!',
          amount: 6,
          cost_per_ounce: 0,
          description: 'Free milk to first request. Thanks!',
          requested: false,
          closed: false
        }),
        knex('listings').insert({
          user_id: 11,
          post_end: '10/10/2017',
          title: 'Breat milk is for babies',
          amount: 12,
          cost_per_ounce: 4,
          description: 'High quality breast milk for sale. Hit me up!',
          requested: true,
          closed: false
        }),
        knex('listings').insert({
          user_id: 12,
          post_end: '1/23/2017',
          title: 'More milk than I need',
          amount: 30,
          cost_per_ounce: 2,
          description: 'A couple of moms and I got together and picked up some extra milk for our kids. Most of the kids have outgrown milk so now we have more milk than we need.',
          requested: false,
          closed: false
        }),
        knex('listings').insert({
          user_id: 13,
          post_end: '7/13/2018',
          title: 'Got milk?',
          amount: 9,
          cost_per_ounce: 2,
          description: 'Got some extra milk. You know the drill. Thanks!',
          requested: false,
          closed: false
        })
      );
    });
};
