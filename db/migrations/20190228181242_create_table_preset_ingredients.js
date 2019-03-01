exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('preset_ingredients', function(table){
      table.increments('id').primary();
      table.integer('preset_drink_id').references('id').inTable('preset_drinks');
      table.integer('ingredient_id').references('id').inTable('ingredients');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('preset_ingredients')
  ])
};