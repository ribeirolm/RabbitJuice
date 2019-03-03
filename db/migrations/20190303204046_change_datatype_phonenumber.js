exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('orders', function(table){
      table.text('phone_number').alter();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('orders', function(table){
      table.integer('phone_number').alter();
    })
  ])
};