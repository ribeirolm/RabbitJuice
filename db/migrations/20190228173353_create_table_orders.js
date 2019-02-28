exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function(table){
      table.increments('id').primary();
      table.string('name');
      table.string('phone_number');
      table.string('status').unsigned()    
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders')
  ])
};