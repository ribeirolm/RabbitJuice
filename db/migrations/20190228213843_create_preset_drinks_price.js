exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('preset_drinks', function(table){
      table.decimal('price');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('preset_drinks', function(table){
      table.dropColumn('price');
    })
  ])
};