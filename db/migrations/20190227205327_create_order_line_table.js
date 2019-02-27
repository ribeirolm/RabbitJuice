exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders_lines', function(table){
      table.increments('id').primary();
      table.integer('order_id').unsigned();
      table.foreign('order_id').references('orders.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders_lines')
  ])
};