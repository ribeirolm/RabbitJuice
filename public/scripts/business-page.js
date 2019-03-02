$(document).ready(function(){

  // Test data:
    // var orders = [
    // {
    // "orderid":2,
    // "id":1,
    // "customername":"Bob",
    // "phone_number":"999-001-0000",
    // "drinkimg":"/public/images/tropical.jpg",
    // "presetname":"Tropical Juice",
    // "iname":["Pineapple","Mango","Banana"]
    // },

    // {
    // "orderid":2,
    // "id":2,
    // "customername":"Bob",
    // "phone_number":"999-001-0000",
    // "drinkimg":"/public/images/green.jpg",
    // "presetname":"Green Juice",
    // "iname":["Apple","Kale","Pineapple"]
    // },

    // {
    // "orderid":3,
    // "id":3,
    // "customername":"Charlie",
    // "phone_number":"444-333-2222",
    // "iname":["Banana","Strawberry","Apple","Mango","Pineapple","Beet"]
    // }
    // ]

  //Function to escape user input
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

  //Function to render all orders including recently submitted orders
    function renderOrders(orders) {
      orders.forEach(function(order){
        let newOrder = createOrderElement(order);
        $("#order").append(newOrder)
      });
    }

  //Function to create new order sections
  //Need to test once database is live
    function createOrderElement(order) {
      let $order = $('<section class="order">').append(`
            <header>
            <h3>${order.orderNum}</h3>
            </header>
            <div>
              <h4>Name: ${escape(order.customerName)}</h4>
              <h4>Phone Number: ${escape(order.phoneNum)}</h4>
              <h4>Line items:</h4>
              <% if (!${order.presetDrinkName}){%>
              <h5>Custom Drink</h5>
              <h6>Ingredients: ${order.ingredientname} </h6>
              <%} else{%>
              <h5>${order.presetDrinkName}</h5>
              <h6>Ingredients: ${order.ingredientname} </h6>
              <%};%>
            </div>
            <footer class="line-item">
              <form method="POST" action="/time-entered">
                <h4>Minutes to completion:</h4>
                <textarea id="minutes"class = "textarea" name="text" placeholder="17"></textarea>
                <button type="submit">Send to Customer</button>
              </form>
            </footer>
          </section> `)

      console.log($order)

      return $order;
    }

  //When form with time to order completion is submitted, validation checks are in place to ensure the time field contains a value.
  //If there is no value in time field being submitted an error message is displayed.
    $("#newOrder").submit(function(event) {
      event.preventDefault();
      let $time = $("#minutes").val().length;
          if($time === 0 || $time === null){
            document.getElementById("#err-noTime").hidden = false;
          } else {
          $.post("/business/time-entered", $("#newOrder").serialize());
          location.reload();
        }
    });

renderOrders();

  //Function to load all orders
    function loadOrders(){
      $.ajax("/api/business", { method: 'GET' })
      .then(function (orders) {
        renderOrders(orders);
        console.log(orders);
      });
    }

    // //Ensuring all orders are loaded
      loadOrders();

})