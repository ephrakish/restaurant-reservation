exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("").primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('mobile_number').notNullable();
    table.string('reservation_date').notNullable();
    table.string('reservation_time').notNullable();
    table.string('people').notNullable();
    table.string('status').notNullable();
    table.timestamps(true, true);
  }).createTable('tables', (table) => {
    table.increments("").primary();
    table.string('table_name').notNullable();
    table.string('capacity').notNullable();
    table.boolean('available').notNullable();
    // table.integer('reservation_id').references('id').inTable('reservations');
    table.timestamps(true, true);
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations").dropTable("tables");
};
