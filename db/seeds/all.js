exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
  knex('users').del(),
  knex('orders').del(),
  knex('orders_lines').del(),
  knex('preset_drinks').del(),
  knex('preset_ingredients').del(),

  knex('users').insert({name: 'Alice', phone_number: '777-098-7654'}),
  knex('users').insert({name: 'Bob', phone_number: '999-001-0000'}),
  knex('users').insert({name: 'Charlie', phone_number: '444-333-2222'}),
  
  knex('orders').insert(({user_id: 7, valid: true})),
  // knex('order').insert(({user_id: 18, valid: true})),
  // knex('order').insert(({user_id: 18, valid: true}))

  ]);
};
