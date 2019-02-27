exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ingredients', function(table){
      table.increments('id').primary();
      table.text('name');
      table.integer('order_line_id').unsigned();
      table.foreign('order_line_id').references('order_line.id');
      table.decimal('price');
      table.text('img');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('ingredients')
  ])
};