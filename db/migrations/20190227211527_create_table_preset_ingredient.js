exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('preset_ingredients', function(table){
      table.increments('id').primary();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('preset_ingredients')
  ])
};