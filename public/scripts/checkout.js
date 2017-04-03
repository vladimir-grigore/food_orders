var url = window.location.pathname;
var id = url.substring(url.lastIndexOf('/') + 1);

$(() => {

  $.ajax({
    method: "GET",
    url: "/api/checkout/" + id
  }).done((results) => {
      console.log("THESE ARE THE RESULTS", results);

    for(let item of results) {
      orderObject[item] = {
        "id": item.menu_item_id,
        "quantity": item.quantity,
        "price": item.price
    }


    }
  });

});

// Handle click events for adding items to the cart
$(".checkout-container").on('click', 'form.checkout-item-quantity-form > button.plus', function(event){
  event.preventDefault();
  var menuName = $(this).parent().siblings(".checkout-item-row").find(".checkout-item-name").text();
  var menuPrice = $(this).parent().siblings(".checkout-item-row").find(".checkout-item-price").data("price");
  var menuItemId = $(this).parents("tr").data("id"); //****

  var $quantityField = $(this).parent().find("input.number-input");
  var value = Number($quantityField.val());
  $quantityField.val(value + 1);
  addMenuItemToBasket(menuName, Number(menuPrice), Number(menuItemId), Number(value));
})

// Handle click events for removing items from the cart
$(".checkout-container").on('click', 'form.checkout-item-quantity-form > button.minus', function(event){
  event.preventDefault();
  var menuName = $(this).parent().siblings(".checkout-item-row").find(".checkout-item-name").text();
  var menuPrice = $(this).parent().siblings(".checkout-item-row").find(".checkout-item-price").data("price");
  var $quantityField = $(this).parent().find("input.number-input");
  var value = Number($quantityField.val());
  if (value > 0) {
    $quantityField.val(value - 1);
    removeMenuItemFromBasket(menuName, Number(menuPrice));
  }
})

function createCheckoutElement (item){
  let $item = $('<div>').addClass('checkout-item-row');
  let $tableRow = $('<tr>').data('id', item.id).appendTo($item);
  $('<td>').addClass('img-col')
  .append($('<img>').attr('src', item.image_url).attr('alt', 'menu-item-1').attr('width', '200')).appendTo($tableRow);
  $('<td>')
  .append($('<p>').addClass('checkout-item-name').text(item.name)).appendTo($tableRow);

  let tableRowForm = $('<td>').appendTo($tableRow)

  let $orderForm = $('<form>').addClass('form-inline checkout-item-quantity-form').appendTo($tableRowForm);
  $("<button>").addClass("btn btn-default plus")
  .append($("<i>").addClass("fa fa-plus").attr("aria-hidden", "true")).appendTo($orderForm);
  $("<input>").attr("type", "text").addClass("form-control number-input").val(item.quantity).appendTo($orderForm);
  $("<button>").addClass("btn btn-default minus")
  .append($("<i>").addClass("fa fa-minus").attr("aria-hidden", "true")).appendTo($orderForm);

  $('<td>')
  .append($('<p>').addClass('checkout-item-price').text("$" + item.price).data('price', item.price)).appendTo($tableRow);
  $('<td>')
  .append($('<a>').attr('href', '#').addClass('fa fa-times checkout-item-delete').attr('aria-hidden', 'true').appendTo($tableRow));

  return $item;
}

// Hold information about the order

function addMenuItemToBasket(title, price, id, quantity) {
    let price = price
    let quantity = quantity
    let perPrice = price/quantity

  if(!orderObject[title]){
    orderObject[title] = {
      "id": id,
      "quantity": quantity,
      "price": price
    }
  } else {
      orderObject[title].quantity += 1;
      orderObject[title].price += perPrice;
  }
}

// Remove item from basket
function removeMenuItemFromBasket(title, price) {
  let price = price
  let quantity = quantity
  let perPrice = price/quantity

  orderObject[title].quantity -= 1;
  orderObject[title].price -= perPrice;
  if (orderObject[title].quantity === 0){
    delete orderObject[title];
  }
}

var orderObject = {};
