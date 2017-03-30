exports.up = function(knex, Promise) {
  return knex.schema.createTable('menu_items', function (table) {
    table.increments();
    table.string('name');
    table.string('image_url');
    table.decimal('price');
    table.string('description');
    table.integer('category_id');
    table.foreign('category_id').references('id').inTable('categories');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('menu_items');
};
