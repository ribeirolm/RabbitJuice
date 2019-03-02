
$(document).ready(function() {
  //Setting up variables
  //Counts the total items user has selected
  var totalCounter = 0;
  //Sums up the total price for all juices
  var totalPrice = 0;
  //Adds the items into an object with the counter Id as a key and the number added as a value
  var cart = {};
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
    else if ($number === null || $number === "" || $number === " " || $number.length !== 10 || isNaN(Number($number))){
      errorMsg.slideDown();
      errorMsg.css('#field-error');
      errorMsg.html('<i class="fas fa-exclamation"></i> Please enter your number');
    }
    else{
      errorMsg.slideUp("medium");
      $(this).unbind('submit').submit();
    }
  });

  //Changes the text in the index.ejs to update the total number of Juices currently added
  function updateTotal(total){
    if (total < 0){
      totalCounter = 0;
    }
    else{
      total = totalPriceSum(cart);
    $("#total-drinks").text(`${total} Juice(s)`);
    }
  }

  //Sums up the number of Juices added in the cart object
  function totalPriceSum( obj ) {
    var sum = 0;
    for( var i in obj ) {
      if( obj.hasOwnProperty(i) ) {
        sum += parseFloat(obj[i]);
      }
    }
    return sum;
  }

  //Changes the text in the index.ejs to update to current total price
  function updateTotalPrice(total){
    if (total < 0){
      totalPrice = 0;
    }

    else{
      $("#price-total").text(`$${total} Total`);
    }

//function to retreive all preset drink data from /api/presets
//refactor later

function loadPresets(){
  $.ajax({
    method: 'GET',
    url:'/api/preset'
  }).done((presets) => {
    console.log(presets)
 

    presets.forEach(juice => {
      switch (juice.id) {
        case 1:
        $('.price').eq(0).text(`$${juice.price}`)
        $('.juice-pics').eq(0).text(`$${juice.img}`)
        break;

        case 2:
        $('.price').eq(1).text(`$${juice.price}`)
        $('.juice-pics').eq(1).text(`$${juice.img}`)
        break;
        
        case 3:
        $('.price').eq(2).text(`$${juice.price}`)
        $('.juice-pics').eq(2).text(`$${juice.img}`)
        break;
        
        case 4:
        $('.price').eq(3).text(`$${juice.price}`)
        $('.juice-pics').eq(3).text(`$${juice.img}`)
        break;
        
        case 5:
        $('.price').eq(4).text(`$${juice.price}`)
        $('.juice-pics').eq(4).text(`$${juice.img}`)
        break;
        
        case 6:
        $('.price').eq(5).text(`$${juice.price}`)
        $('.juice-pics').eq(5).text(`$${juice.img}`)
        break;
        
        case 7:
        $('.price').eq(6).text(`$${juice.price}`)
        $('.juice-pics').eq(6).text(`$${juice.img}`)
        break;
      }
    });
  })
}

function loadCustomizeIngredients() {
  // $.ajax({
  //   method: 'GET',
  //   url:'/api/preset'
  // }).done((presets) => {
}

let totalCounter = 0;
let totalPrice = 0;
let cart = {};
$(document).ready(function() {

  //calling preset drink data
loadPresets()

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

  //When user clicks the '+' button under any juice
  $(".increase").on("click", function (event){
    //Finding the juice price
    var price = event.target.previousSibling.previousSibling.innerHTML;
    var priceNumber = Number(price.replace(/[^0-9.-]+/g,""));

    //Getting the juice counters item ID to be used as a key for the cart object
    var itemId = event.target.nextSibling.nextSibling.id;

    //Finding the juice counters ID
    var counter = event.target.nextSibling.nextSibling.innerHTML;

    //Updating totalCounter and counter
    totalCounter++;
    counter++;

    if (counter > 0) {
      //Show the '-' button
      $(event.target.nextSibling.nextSibling).removeClass("hide");
      $(event.target.nextSibling.nextSibling.nextSibling.nextSibling).addClass("show-button");
    }
    if (counter > 9){
      //Make the text smaller
      $(event.target.nextSibling.nextSibling).addClass("smaller");
    }
    else {
      //If item becomes less than 10 make the text bigger again
      $(event.target.nextSibling.nextSibling).removeClass("smaller");
    }
    //Insert the current counter for that Juice into the juice counter text on index.ejs
    $(event.target.nextSibling.nextSibling).text(counter);

    //If user has not selected that juice yet, make a key in the cart object with that juices' counter ID otherwise add one to that key
    if (!Object.keys(cart).includes(itemId)){
      cart[itemId] = 1;
    }
    else {
      cart[itemId]++;
    }

    //Update the total price and juice total on the page
    totalPrice += priceNumber;
    updateTotal(totalCounter);
    updateTotalPrice(totalPrice);
    console.log(cart);
  });

  //When the user clicks the '-' under any juice
  $(".decrease").on("click", function (event)
  {
    //Finding current juice count
    var counterDecrease = event.target.previousSibling.previousSibling.innerHTML;
    //Finding juice price
    var priceDecrease = event.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
    var priceNumberDecrease = Number(priceDecrease.replace(/[^0-9.-]+/g,""));
    //Finding juice counter Id
    var itemIdDecrease = event.target.previousSibling.previousSibling.id;

    //Updating current Juice counter and total counter as well as the number in the cart object
    totalCounter--;
    counterDecrease--;
    cart[itemIdDecrease]--;

    //If the counter for that juice was previously over 10 and is now under 10 make sure the text isn't smaller
    if (counterDecrease < 10){
      $(event.target.previousSibling.previousSibling).removeClass("smaller");
    }
    //If the counter for that juice is now 0 hide the counter and hide the '-' button
    if (counterDecrease === 0){
      $(event.target.previousSibling.previousSibling).addClass("hide");
      $(this).removeClass("show-button");
    }

    //Update the induvidual juice counter as well as total price and juice total on the page
    $(event.target.previousSibling.previousSibling).text(counterDecrease);
    totalPrice = totalPrice - priceNumberDecrease;
    updateTotalPrice(totalPrice);
    updateTotal(totalCounter);
  });

  //When a user adds a 'Make Your Own' juice
  $("#increase-myo").on("click", function (event)
  {
    //Finding the ingredient menu section in the index.ejs
    var $customMenu = $(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[2]);
    //Show the menu
    $customMenu.slideDown();
  });

  //Removes an ingredient ID from the checked items array
  function arrayRemove(arr, value) {
    return arr.filter(function(element){
      return element != value;
    });
  }

  //If a user checks the box for an ingredient
  $('.checkbox').on("click", function(event) {
    //Finding ingredient price
    var price = event.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
    var priceNumber = Number(price.replace(/[^0-9.-]+/g,""));

    //If the box is now checked
    if (event.target.checked === true){
      //add the ingredient price together and to the price total and add the ingredient Id to the checkedItems array
      checkedItems.push(event.target.id);
      console.log(checkedItems);
      totalPrice = totalPrice + priceNumber;
      updateTotalPrice(totalPrice);

      //if a user unchecks a box
    } else{
      //removes the ingredient Id from the checkedItems array and subtracts it's price from the totalPrice
      checkedItems = arrayRemove(checkedItems, event.target.id);
      totalPrice = totalPrice - priceNumber;
      updateTotalPrice(totalPrice);
    }
    console.log(checkedItems);
  });

  //When a user clicks on the 'OK' button in the select your ingredients menu
  $("#myo-button").on("click", function(event) {
    //Make the menu slide up
    $(event.target.parentNode.parentNode).slideUp();
  });

  $("#decrease-myo").on("click", function(){
    checkedItems = [];
    totalPrice = totalPrice - totalIngredientPrice;
    $('.checkbox').checked = false;
  });

});