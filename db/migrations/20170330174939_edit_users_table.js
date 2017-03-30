
exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users", (table) => {
    table.string('phone_number', 35).notNullable().alter();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("users", (table) => {
    table.integer('phone_number');
  })
};
