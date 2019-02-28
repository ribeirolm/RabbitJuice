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

let totalCounter = 0;
let totalPrice = 0;
$(document).ready(function() {
  
function updateTotal(total){
  if (total < 0){
    totalCounter = 0;
  }
  else{
  $("#body-footer .total").text(`${total} Juice(s)`);
  }
}

  $(".increase").on("click", function (event)
  {

    console.log(event);
    
    let counter = event.target.nextSibling.nextSibling.innerHTML;

    totalCounter++;
    counter++;
    
    if (counter > 0) {
      $(event.target.nextSibling.nextSibling).removeClass("hide");
    }
    if (counter > 9){
      $(event.target.nextSibling.nextSibling).addClass("smaller");
    }
    else {
      $(event.target.nextSibling.nextSibling).removeClass("smaller");
    }
    $(event.target.nextSibling.nextSibling).text(counter);
    updateTotal(totalCounter);
  
});

$(".decrease").on("click", function (event)
{
  let counter = event.target.previousSibling.previousSibling.innerHTML;
  
  totalCounter--;
  counter--;
  
  if (counter < 0){
    counter = 0;
  }
  else if (counter < 10){
    $(event.target.previousSibling.previousSibling).removeClass("smaller");
  }
  if (counter === 0){
    $(event.target.previousSibling.previousSibling).addClass("hide");
  }
  $(event.target.previousSibling.previousSibling).text(counter);
  updateTotal(totalCounter);
});
});