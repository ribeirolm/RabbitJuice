exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('order', function(table){
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('user.id');
      table.boolean('valid').unsigned()
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order')
  ])
};