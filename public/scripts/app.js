
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


$(document).ready(function() {

var totalCounter = 0;
var totalPrice = 0;
var cart = {};

const errorMsg = $('#field-error');

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
    $(this).unbind('submit').submit()
  }
});

console.log($credentials[0][1].value);



// $tweetForm.submit(function(event) {
//   event.preventDefault();
//   var $tweet = $($tweetForm.children("#compose-tweet-area")[0]).val();
//   if ($tweet === null || $tweet === "" ){
//     errorMsg.slideDown();
//     errorMsg.css('#tweet-error');
//     errorMsg.html('<i class="fas fa-exclamation"></i> Unable to post empty tweet');
//   }
//   else if ($tweet.length > 140){
//     errorMsg.slideDown();
//     errorMsg.css('#tweet-error');
//     errorMsg.html('<i class="fas fa-exclamation"></i> Tweet cannot be longer than 140 characters');
//   }
//   else{
//     errorMsg.slideUp("medium");
//     $.post('/tweets', $tweetForm.serialize())
//   .then(populateTweets);
//   $('#compose-tweet-area').val("");
//   let counter = $("#compose-tweet-area").siblings(".counter");
//   counter[0].innerText = 140;
//   }
// });

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
  $customMenu.addClass("customize-menu-show");
});

});