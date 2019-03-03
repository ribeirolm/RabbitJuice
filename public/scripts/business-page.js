$(document).ready(function(){

    //Function to escape user input
      function escape(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
      }

    //Function to identify whether drink is custom or preset and return the name of the drink
     function drinkName(order) {
        if (order === undefined || order === null) {
          return "Drink: Custom Drink"
        } else {
          return "Drink: " + order
        }
      }

    //Function to render all orders including recently submitted orders
      function renderOrders(orders) {
        orders.forEach(function(order){
          let newOrder = createOrderElement(order);
          $(".container").append(newOrder)
        });
      }

    //Function to create new order sections
      function createOrderElement(order) {
        let $order =  $('<section id="order">').append(`
              <header>
              <h3>ORDER: ${order.orderNum}</h3>
              </header>
              <div>
                <h4>Name: ${escape(order.customerName)}</h4>
                <h4>Phone Number: ${escape(order.phoneNum)}</h4>
                <h4>Line items:</h4>
                <h5> ${drinkName(order.presetDrinkName)}</h5>
                <h6>Ingredients: ${order.ingredientname} </h6>
              </div>
              <footer class="line-item">
                <form id="newOrder" method="POST" action="/business/time-entered">
                  <h4>Minutes to completion:</h4>
                  <p id= "err-noTime" hidden>This order does not have a time to completion therefore cannot be submitted.</p>
                  <textarea name="minutes" class = "textarea" name="text" placeholder="Enter number of minutes here"></textarea>
                  <input type="hidden" name="phoneNumber" value= ${escape(order.phoneNum)}>
                  <input name="minuteSubmit" class="minuteSubmit" type="submit" value="Send to Customer">
                </form>
                  <button class="pickedup" type="submit" value="Picked Up">Picked Up</button>
              </footer>
              </section>`)
        return $order;
      }

  // var errorMsg = $('#field-error');

  // //Displays an error message if a user does not enter minutes in the minutes field a Name or Number or if a Number isn't 10 digits
  // var $minutes = $('.textarea');
  // $minutes.submit(function(event){
  //   event.preventDefault();
  //   if ($minutes.value === null || $minutes === "" || $minutes === " "){
  //     errorMsg.slideDown();
  //     errorMsg.css('#filed-error');
  //     errorMsg.html('<i class="fas fa-exclamation"></i> Please enter a number');
  //   } else{
  //     errorMsg.slideUp("medium");
  //     $(this).unbind('submit').submit();
  //   }
  // });

  $(".textarea").submit(function(event) {
    event.preventDefault();
    let $minutes = $(".textarea").val().length;
        if($minutes === "" || $minutes === null || $minutes === " "){
          document.getElementById("#err-noTime").hidden = false;
        } else {
        $("#err-noTime").slideUp("slow");
        $(this).unbind('submit').submit();
        // $.post( "/tweets/", $("#newTweet").serialize());
        // location.reload();
      }
  });


    //When form with time to order completion is submitted, validation checks are in place to ensure the time field contains a value.
    //If there is no value in time field being submitted an error message is displayed.
      // $("#newOrder").submit(function(event) {
      //   event.preventDefault();
      //   let $time = $("#minutes").val().length;
      //       if($time === 0 || $time === null){
      //         document.getElementById("#err-noTime").hidden = false;
      //       } else {
      //       $.post("/business/time-entered", $("#newOrder").serialize());
      //       location.reload();
      //     }
      // });

    //To change the class of an order on the selection of "pick up" to hide the order when it has been picked up
      $(".pickedup").on("click", function (event){
        let $order = $(event.target.parentNode.parentNode);
        $order.slideUp();
      });

    //Function to load all orders
      function loadOrders(){
        $.ajax("/api/business", { method: 'GET' })
        .then(function (orders) {
          renderOrders(orders);
        });
      }

      // //Ensuring all orders are loaded
        loadOrders();

})