exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders_lines', function(table){
      table.integer('preset_drink_id').unsigned();
      table.foreign('preset_drink_id').references('preset_drinks.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders_lines', function(table) {
      table.dropColumn('preset_drink_id');
    })
  ])
};