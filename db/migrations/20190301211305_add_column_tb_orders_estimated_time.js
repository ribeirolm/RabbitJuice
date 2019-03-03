exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function(table){
      table.decimal('estimated_time');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('orders', function(table){
      table.dropColumn('estimated_time');
    })
  ])
};