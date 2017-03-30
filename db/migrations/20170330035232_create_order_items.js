exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_items', function (table) {
    table.increments();
    table.integer('order_id');
    table.foreign('order_id').references('id').inTable('orders');
    table.integer('menu_item_id');
    table.foreign('menu_item_id').references('id').inTable('menu_items');
    table.unique(['order_id', 'menu_item_id']);
    table.decimal('price');
    table.integer('quantity');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_items');
};