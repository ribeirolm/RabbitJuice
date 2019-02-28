exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('customized_drinks_ingredients', function(table){
      table.increments('id').primary();
      table.integer('customized_drink_id').references('id').inTable('orders_lines');
      table.integer('ingredient_id').references('id').inTable('ingredients')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('customized_drinks_ingredients')
  ])
};