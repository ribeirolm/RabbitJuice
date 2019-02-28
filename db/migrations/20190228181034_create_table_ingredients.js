exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ingredients', function(table){
      table.increments('id').primary();
      table.string('name');
      table.decimal('price');
      table.string('img');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('ingredients')
  ])
};