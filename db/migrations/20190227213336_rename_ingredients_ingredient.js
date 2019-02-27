exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('ingredients', 'ingredient')
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('ingredient', 'ingredients')
  ])
};