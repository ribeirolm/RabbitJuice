exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
  knex('customized_drinks_ingredients').del(),
  knex('orders_lines').del(),
  knex('preset_ingredients').del(),
  knex('preset_drinks').del(),
  knex('ingredients').del(),
  knex('orders').del()
  
  ]).then(() => Promise.all([
  //data in orders
  knex('orders').insert({id: 1, name: 'Alice', phone_number: '777-098-7654', status: "picked up", estimated_time: 5}),
  knex('orders').insert({id: 2, name: 'Bob', phone_number: '999-001-0000', status: "outstanding", estimated_time: 7}),
  knex('orders').insert({id: 3, name: 'Charlie', phone_number: '444-333-2222', status: "outstanding", estimated_time: 15})
  ])).then(() => Promise.all([
  //data in ingredients
  knex('ingredients').insert({id: 1, name: 'Strawberry', price: 2.50, img: '/public/images/strawberries.jpg'}),
  knex('ingredients').insert({id: 2, name: 'Blueberry', price: 2.50, img: '/public/images/blueberries.jpg'}),
  knex('ingredients').insert({id: 3, name: 'Banana', price: 2.50, img: '/public/images/bananas.jpg'}),
  knex('ingredients').insert({id: 4, name: 'Apple', price: 2.75, img: '/public/images/apples.jpg'}),
  knex('ingredients').insert({id: 5, name: 'Mango', price: 2.50, img: '/public/images/mangoes.jpg'}),
  knex('ingredients').insert({id: 6, name: 'Pineapple', price: 2.50, img: '/public/images/pineapples.jpg'}),
  knex('ingredients').insert({id: 7, name: 'Orange', price: 2.50, img: '/public/images/oranges.jpg'}),
  knex('ingredients').insert({id: 8, name: 'Carrot', price: 2.75, img: '/public/images/carrots.jpg'}),
  knex('ingredients').insert({id: 9, name: 'Kale', price: 2.50, img: '/public/images/kale.jpg'}),
  knex('ingredients').insert({id: 10, name: 'Celery', price: 2.75, img: '/public/images/celery.jpg'}),
  knex('ingredients').insert({id: 11, name: 'Beet', price: 2.50, img: '/public/images/beets.jpg'}),
  knex('ingredients').insert({id: 12, name: 'Ginger', price: 3.00, img: '/public/images/ginger.jpg'}),
  knex('ingredients').insert({id: 13, name: 'Energy', price: 3.50, img: '/public/images/energy.jpg'}),
  knex('ingredients').insert({id: 14, name: 'Protein', price: 3.50, img: '/public/images/protein.jpg'}),
  knex('ingredients').insert({id: 15, name: 'Immunity', price: 3.50, img: '/public/images/immunity.jpg'})
])).then(() => Promise.all([
  knex('preset_drinks').insert({id: 1, name: 'Berry Juice', price: '6.25', img: '/public/images/berry.jpg'}),
  knex('preset_drinks').insert({id: 2, name: 'Strawberrry Banana Juice', price: '6.25', img: '/public/images/straw-banana.jpg'}),
  knex('preset_drinks').insert({id: 3, name: 'Tropical Juice', price: '7.50', img: '/public/images/tropical.jpg'}),
  knex('preset_drinks').insert({id: 4, name: 'Green Juice', price: '7.50', img: '/public/images/green.jpg'}),
  knex('preset_drinks').insert({id: 5, name: 'Veggie Juice', price: '8.25', img: '/public/images/veggie.jpg'}),
  knex('preset_drinks').insert({id: 6, name: 'Orange Mango Juice', price: '6.25', img: '/public/images/orange-mango.jpg'}),
  knex('preset_drinks').insert({id: 7, name: 'Red Juice', price: '7.50', img: '/public/images/red.jpg'})

])).then(() => Promise.all([

  knex('preset_ingredients').insert({id: 1, preset_drink_id: 1, ingredient_id: 1}),
  knex('preset_ingredients').insert({id: 2, preset_drink_id: 1, ingredient_id: 2}),
  knex('preset_ingredients').insert({id: 3, preset_drink_id: 2, ingredient_id: 1}),
  knex('preset_ingredients').insert({id: 4, preset_drink_id: 2, ingredient_id: 3}),
  knex('preset_ingredients').insert({id: 5, preset_drink_id: 3, ingredient_id: 5}),
  knex('preset_ingredients').insert({id: 6, preset_drink_id: 3, ingredient_id: 6}),
  knex('preset_ingredients').insert({id: 7, preset_drink_id: 3, ingredient_id: 3}),
  knex('preset_ingredients').insert({id: 8, preset_drink_id: 4, ingredient_id: 4}),
  knex('preset_ingredients').insert({id: 9, preset_drink_id: 4, ingredient_id: 9}),
  knex('preset_ingredients').insert({id: 10, preset_drink_id: 4, ingredient_id: 6}),
  knex('preset_ingredients').insert({id: 11, preset_drink_id: 5, ingredient_id: 8}),
  knex('preset_ingredients').insert({id: 12, preset_drink_id: 5, ingredient_id: 9}),
  knex('preset_ingredients').insert({id: 13, preset_drink_id: 5, ingredient_id: 11}),
  knex('preset_ingredients').insert({id: 14, preset_drink_id: 6, ingredient_id: 7}),
  knex('preset_ingredients').insert({id: 15, preset_drink_id: 6, ingredient_id: 5}),
  knex('preset_ingredients').insert({id: 16, preset_drink_id: 7, ingredient_id: 8}),
  knex('preset_ingredients').insert({id: 17, preset_drink_id: 7, ingredient_id: 4}),
  knex('preset_ingredients').insert({id: 18, preset_drink_id: 7, ingredient_id: 11})
  
])).then(() => Promise.all([  

  knex('orders_lines').insert({id: 1, order_id: 2, preset_drink_id: 3}),  
  knex('orders_lines').insert({id: 2, order_id: 2, preset_drink_id: 4}),
  knex('orders_lines').insert({id: 3, order_id: 3})

])).then(() => Promise.all([

  knex('customized_drinks_ingredients').insert({id: 1, customized_drink_id: 3, ingredient_id: 1}),  
  knex('customized_drinks_ingredients').insert({id: 2, customized_drink_id: 3, ingredient_id: 3}),
  knex('customized_drinks_ingredients').insert({id: 3, customized_drink_id: 3, ingredient_id: 4}),
  knex('customized_drinks_ingredients').insert({id: 4, customized_drink_id: 3, ingredient_id: 5}),
  knex('customized_drinks_ingredients').insert({id: 5, customized_drink_id: 3, ingredient_id: 6}),
  knex('customized_drinks_ingredients').insert({id: 6, customized_drink_id: 3, ingredient_id: 11})

]))

};
