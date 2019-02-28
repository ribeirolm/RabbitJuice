exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('order_line', function(table){
      table.integer('preset_drink_id').unsigned();
      table.foreign('preset_drink_id').references('preset_drink.id');
      table.dropColumn('valid');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('order_line', function(table) {
      table.dropColumn('preset_drink_id');
      table.boolean('valid');
    })
  ])
};