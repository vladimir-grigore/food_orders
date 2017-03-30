exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', function (table) {
    table.increments();
    table.string('name');
    table.integer('priority');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories');
};
