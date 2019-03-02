
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


// $(() => {
//   $.ajax(
//     {
//       method: 'GET',
//       url:'/api/preset'
//     })
// }).done((presets) => {
//   console.log(presets)
// });

$(document).ready(function() {
//Setting up variables
//Counts the total items user has selected
var totalCounter = 0;
//Sums up the total price for all juices
var totalPrice = 0;
//Adds the items into an object with the counter Id as a key and the number added as a value
var cart = {};
//Adds all the ingredient prices together
var totalIngredientPrice = 0;
//Adds all the slected ingredients into an array based on their id
var checkedItems = [];
//Naming an error message for user input fields
var errorMsg = $('#field-error');

//Displays an error message if a user does not enter a Name or Number or if a Number isn't 10 digits
var $credentials = $('#userForm');
$credentials.submit(function(event){
  event.preventDefault();
  var $name = $credentials[0][0].value;
  var $number = $credentials[0][1].value;
  if ($name === null || $name === "" || $name === " "){
    errorMsg.slideDown();
    errorMsg.css('#filed-error');
    errorMsg.html('<i class="fas fa-exclamation"></i> Please enter your name');
  }
  else if ($number === null || $number === "" || $number === " " || $number.length !== 10){
    errorMsg.slideDown();
    errorMsg.css('#field-error');
    errorMsg.html('<i class="fas fa-exclamation"></i> Please enter your number');
  }
  else{
    errorMsg.slideUp("medium");
    $(this).unbind('submit').submit();
  }
});

  
function updateTotal(total){
  if (total < 0){
    totalCounter = 0;
  }
  else{
    total = totalPriceSum(cart);
  $("#total-drinks").text(`${total} Juice(s)`);
  }
}

// console.log($("#total-drinks"));

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
  // console.log(event);
  totalCounter++;
  counter++;
  // console.log(event.target.nextSibling.nextSibling.nextSibling.nextSibling);
  
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
    // console.log(cart);
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
  // console.log(cart);
});


$("#increase-myo").on("click", function (event)
{
  var $customMenu = $(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[2]);
  $customMenu.slideDown().addClass("customize-menu-show");
});

function arrayRemove(arr, value) {

  return arr.filter(function(ele){
      return ele != value;
  });

}

$('.checkbox').on("click", function(event) {
  var price = event.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
  var priceNumber = Number(price.replace(/[^0-9.-]+/g,""));
  if (event.target.checked === true){
      totalIngredientPrice = totalIngredientPrice + priceNumber;
      totalPrice = totalPrice + totalIngredientPrice;
      checkedItems.push(event.target.id);
      updateTotalPrice(totalPrice);
  } else{
      totalIngredientPrice = totalIngredientPrice - priceNumber;
      totalPrice = totalPrice - priceNumber;
      checkedItems = arrayRemove(checkedItems, event.target.id);
      updateTotalPrice(totalPrice);
  }

  $("#myo-button").on("click", function(event) {
    $(event.target.parentNode.parentNode).slideUp();
    
    console.log(event.target.parentNode.parentNode.className);
  });
  
  console.log(totalIngredientPrice);
  console.log(checkedItems);
});

});