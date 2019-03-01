exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('preset_drinks', function(table){
      table.increments('id').primary();
      table.string('name');
      table.decimal('price');
      table.text('img');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('preset_drinks')
  ])
};