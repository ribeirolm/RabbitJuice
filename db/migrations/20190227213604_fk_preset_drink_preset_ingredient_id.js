exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('preset_drinks', function(table){
      table.integer('preset_ingredient_id').unsigned();
      table.foreign('preset_ingredient_id').references('preset_ingredients.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('preset_drinks', function(table) {
      table.dropColumn('preset_ingredient_id');
    })
  ])
};