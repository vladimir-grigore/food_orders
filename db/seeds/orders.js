exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(function () {
      return Promise.all([
        knex('orders').insert({id: 1, user_id: 'Alice', last_name: 'Smith', username: 'asmith', phone_number: '6042345678', password: '12345', user_type: 'customer'}),
        knex('orders').insert({id: 2, user_id:'Vlad', last_name: 'Dole', username: 'vlad', phone_number: '7788937226', password: '12345', user_type: 'customer'}),
        knex('orders').insert({id: 3, user_id:'Bassim', last_name: 'Ray', username: 'bassim', phone_number: '7788881940', password: '12345', user_type: 'customer'}),
        knex('orders').insert({id: 4, user_id: 'Cook', last_name: 'Chef', username: 'cchef', phone_number: '6042233678', password: '12345', user_type: 'admin'}),
        knex('orders').insert({id: 5, user_id: 'Jan', last_name: 'Wong', username: 'jwong', phone_number: '7786283361', password: '12345', user_type: 'admin'})
      ]);
    });
};
