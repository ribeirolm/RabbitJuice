var totalIngredientPrice = 0;

$(document).ready(function() {

    
    $('.checkbox').on("click", function(event) {
        let price = event.target.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
        let priceNumber = Number(price.replace(/[^0-9.-]+/g,""));
        if (event.target.checked === true){
            totalIngredientPrice = totalIngredientPrice + priceNumber;
        } else{
            totalIngredientPrice = totalIngredientPrice - priceNumber;
        }
        console.log(totalIngredientPrice);
        
    });
});



