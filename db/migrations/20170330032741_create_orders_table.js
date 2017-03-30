
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', function (table) {
    table.increments();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.string('payment_option');
    table.timestamp('placed_at');
    table.timestamp('completed_at');
    table.integer('time_estimate');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
