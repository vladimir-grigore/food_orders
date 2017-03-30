exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, first_name: 'Alice', last_name: 'Smith', username: 'asmith', phone_number: 6042345678, password: '12345', user_type: 'customer'}),
        knex('users').insert({id: 2, first_name: 'Vlad', last_name: 'Dole', username: 'vlad', phone_number: 7788937226, password: '12345', user_type: 'customer'}),
        knex('users').insert({id: 3, first_name: 'Bassim', last_name: 'Ray', username: 'bassim', phone_number: 7788881940, password: '12345', user_type: 'customer'}),
        knex('users').insert({id: 4, first_name: 'Cook', last_name: 'Chef', username: 'cchef', phone_number: 6042233678, password: '12345', user_type: 'admin'}),
        knex('users').insert({id: 5, first_name: 'Jan', last_name: 'Wong', username: 'jwong', phone_number: 7786283361, password: '12345', user_type: 'admin'})
      ]);
    });
};
