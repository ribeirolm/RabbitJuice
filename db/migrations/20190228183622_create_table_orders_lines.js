exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders_lines', function(table){
      table.increments('id').primary();
      table.integer('order_id').references('id').inTable('orders');
      table.integer('preset_drink_id').references('id').inTable('preset_drinks').defaultTo(null);
    
    
    
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders_lines')
  ])
};