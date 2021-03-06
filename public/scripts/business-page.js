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
                <form id="newOrder" method="POST" action="/business/time">
                  <h4>Minutes to completion:</h4>
                  <p id= "err-noTime" hidden>This order does not have a time to completion therefore cannot be submitted.</p>
                  <textarea name="minutes" class = "textarea" name="text" placeholder="Enter number of minutes here"></textarea>
                  <input type="hidden" name="phoneNumber" value= ${escape(order.phoneNum)}>
                  <input type="hidden" name="orderId" value= ${order.orderNum}>
                  <input name="minuteSubmit" class="minuteSubmit" type="submit" value="Send to Customer">
                </form>
                <form method="POST" action="/business/status">
                  <input type="hidden" name="orderId" value= ${order.orderNum}>
                  <input class="pickedup" type="submit" value="Picked Up">
                </form>
              </footer>
              </section>`)
        return $order;
      }

    // When form with time to order completion is submitted, validation checks are in place to ensure the time field contains a value.
    // If there is no value in time field being submitted an error message is displayed.
      // $("#order").submit(function(event) {
      //   event.preventDefault();
      //   let $time = $(".textarea").val().length;
      //       if($time === 0 || $time === null){
      //         document.getElementById("#err-noTime").hidden = false;
      //       } else {
      //       $.post("/business/time-", $("#order").serialize());
      //       location.reload();
      //     }
      // });


    //Function to load all orders
      function loadOrders(){
        $.ajax("/api/business", { method: 'GET' })
        .then(function (orders) {
          renderOrders(orders);
        });
      }

    // //Selecting pickup button should hide that specific order
    //   $(".pickedup").on("click", function (event){
    //     let $order = $(event.target.parentNode.parentNode.parentNode);
    //     $order.slideUp();
    //   });

      // //Ensuring all orders are loaded
        loadOrders();

})
