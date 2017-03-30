
exports.up = function(knex, Promise) {
  return knex.schema.table("users", (table) => {
    table.dropColumn('name');
    table.string("first_name");
    table.string("last_name");
    table.string("username");
    table.string("password");
    table.integer("phone_number");
    table.string("user_type");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("users", (table) => {
    table.dropColumns('first_name', 'last_name', 'username', 'password', 'phone_number', 'user_type');
    table.string('name');
  })
};
