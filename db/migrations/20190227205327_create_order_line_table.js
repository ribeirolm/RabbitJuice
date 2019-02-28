exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('order_line', function(table){
      table.increments('id').primary();
      table.integer('order_id').unsigned();
      table.foreign('order_id').references('order.id');
      table.boolean('valid').unsigned()
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order_line')
  ])
};