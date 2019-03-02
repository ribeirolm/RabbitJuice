var totalIngredientPrice = 0;
var checkedItems = [];


$(document).ready(function() {
    function arrayRemove(arr, value) {

        return arr.filter(function(ele){
            return ele != value;
        });
     
     }
    
    $('.checkbox').on("click", function(event) {
        let price = event.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
        let priceNumber = Number(price.replace(/[^0-9.-]+/g,""));
        if (event.target.checked === true){
            totalIngredientPrice = totalIngredientPrice + priceNumber;
            checkedItems.push(event.target.id);
        } else{
            totalIngredientPrice = totalIngredientPrice - priceNumber;
            checkedItems = arrayRemove(checkedItems, event.target.id);
        }
        console.log(totalIngredientPrice);
        console.log(checkedItems);
    });
});



