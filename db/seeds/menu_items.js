exports.seed = function(knex, Promise) {
  return knex('menu_items').del()
    .then(function () {
      return Promise.all([
        knex('menu_items').insert({id: 1, name:'Ravioli Caprese', image_url: '/img/image-1.png', price:'18', description:'buffalo mozzerella + basil', category_id: 2 }),
        knex('menu_items').insert({id: 2, name:'Crostini', image_url: '/img/image-2.png', price:'13', description:'grappa marinated salmon + vegetables', category_id: 1 }),
        knex('menu_items').insert({id: 3, name:'Bufala Mozzerella Salad', image_url: '/img/image-3.png', price:'12', description:'sicilian caponata + tomatoes', category_id: 1 }),
        knex('menu_items').insert({id: 4, name:'Mussel Fettuccine', image_url: '/img/image-4.png', price:'21', description:'mussels + lemon-butter', category_id: 2 }),
        knex('menu_items').insert({id: 5, name:'Sunchoke Porcini Risotto', image_url: '/img/image-5.png', price:'12', description:'argentina prawn + olive oil', category_id: 2 }),
        knex('menu_items').insert({id: 6, name:'Octopus Mosaic', image_url: '/img/image-6.png', price:'14', description:'limoncello vinegarette + pimento', category_id: 1 }),
        knex('menu_items').insert({id: 7, name:'Taglierini', image_url: '/img/image-7.png', price:'20', description:'wild mushrooms + seafood', category_id: 2 }),
        knex('menu_items').insert({id: 8, name:'Wild Salmon', image_url: '/img/image-8.png', price:'16', description:'meyer lemon marmalade + chile', category_id: 1 })
      ]);
    });
};
