
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });


$(() => {
  $.ajax(
    {
      method: 'GET',
      url:'/api/preset'
    })
}).done((presets) => {

  console.log(presets)



})

let totalCounter = 0;
let totalPrice = 0;
let cart = {};
$(document).ready(function() {
  
function updateTotal(total){
  if (total < 0){
    totalCounter = 0;
  }
  else{
    total = totalPriceSum(cart);
  $("#total-drinks").text(`${total} Juice(s)`);
  }
}

function totalPriceSum( obj ) {
  var sum = 0;
  for( var i in obj ) {
    if( obj.hasOwnProperty(i) ) {
      sum += parseFloat(obj[i]);
    }
  }
  return sum;
}

function updateTotalPrice(total){
  if (total < 0){
    totalPrice = 0;
  }

  else{
    $("#footer-total").text(`$${total} Total`);
  }
}

  $(".increase").on("click", function (event)
  {

    let price = event.target.previousSibling.previousSibling.innerHTML;
    let priceNumber = Number(price.replace(/[^0-9.-]+/g,""));
    
    let itemId = event.target.nextSibling.nextSibling.id;

    
    let counter = event.target.nextSibling.nextSibling.innerHTML;
    console.log(event);
    totalCounter++;
    counter++;
    console.log(event.target.nextSibling.nextSibling.nextSibling.nextSibling);

    if (counter > 0) {
      $(event.target.nextSibling.nextSibling).removeClass("hide");
      $(event.target.nextSibling.nextSibling.nextSibling.nextSibling).addClass("show-button");
    }
    if (counter > 9){
      $(event.target.nextSibling.nextSibling).addClass("smaller");
    }
    else {
      $(event.target.nextSibling.nextSibling).removeClass("smaller");
    }
    $(event.target.nextSibling.nextSibling).text(counter);

      if (!Object.keys(cart).includes(itemId)){
        cart[itemId] = 1;
      }
      else {
        cart[itemId]++;
      }

      totalPrice += priceNumber;
    console.log(cart);
    updateTotal(totalCounter);
    updateTotalPrice(totalPrice);
  
});

$(".decrease").on("click", function (event)
{
  let counter = event.target.previousSibling.previousSibling.innerHTML;
  let price = event.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
  let priceNumber = Number(price.replace(/[^0-9.-]+/g,""));
  let itemId = event.target.previousSibling.previousSibling.id;
  
  if (cart[itemId] < 1 || !Object.keys(cart).includes(itemId)){
    cart[itemId] = 0;
  }
  totalCounter--;
  counter--;
  cart[itemId]--;
  
  if (counter < 0){
    counter = 0;
    cart[itemId] = 0;
  }
  else if (counter < 10){
    $(event.target.previousSibling.previousSibling).removeClass("smaller");
  }
  if (counter === 0){
    $(event.target.previousSibling.previousSibling).addClass("hide");
    $(this).removeClass("show-button");
  }

  $(event.target.previousSibling.previousSibling).text(counter);
  totalPrice = totalPrice - priceNumber;
    updateTotalPrice(totalPrice);
    updateTotal(totalCounter);
  console.log(cart);
});
//  5adec31f2508629f6f4e965254b4066cae5f012b
});