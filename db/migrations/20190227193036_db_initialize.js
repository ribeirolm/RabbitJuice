exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user', function(table){
      table.increments('id').primary();
      table.string('name');
      table.integer('phone_number');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user')
  ])
};