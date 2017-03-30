exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        knex('categories').insert({id: 1, name:'Appetizers', priority:1 }),
        knex('categories').insert({id: 2, name:'Mains', priority:2 })
        ]);
    });
};
