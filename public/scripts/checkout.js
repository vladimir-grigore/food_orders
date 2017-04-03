$(() => {

  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);

  loadPage();

  function loadPage(){
    console.log("ON THE CHECKOUT PAGE");

    $.ajax({
      method: "GET",
      url: `/api/checkout/${id}`
    }).done((results) => {
      for(let item of results) {
        if (!orderObject[item.menu_item_id]){
          orderObject[item.menu_item_id] = {
            "price": item.price,
            "quantity": item.quantity,
            "menu_item_id": item.menu_item_id,
            "name": item.name
          };
        }
        createCheckoutElement(item).appendTo(".table");
      }
    });
    console.log("******", orderObject);
  }

  $("#pay-in-person").on('click', function(event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: `/api/checkout/${id}`,
      data: {
        payemnt_option: "in_person",
        items: orderObject
      }
    })
    .done(() => {
      window.location.href = `/`;
    });
  }); 

   $("#pay-online").on('click', function(event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: `/api/checkout/${id}`,
      data: {
        payemnt_option: "credit_card",
        items: orderObject
      }
    })
    .done(() => {
      window.location.href = `/`;
    });
  }); 

});

function createCheckoutElement (item){
  let $item = $('<tr>').addClass('checkout-item-row');
  let $tableRow = $('<tr>').data('id', item.menu_item_id).appendTo($item);
  $('<td>').addClass('img-col')
  .append($('<img>').attr('src', item.image_url).attr('alt', 'menu-item-1').attr('width', '200')).appendTo($tableRow);
  $('<td>')
  .append($('<p>').addClass('checkout-item-name').text(item.name)).appendTo($tableRow);

  let $tableRowForm = $('<td>').appendTo($tableRow);

  let $orderForm = $('<form>').addClass('form-inline checkout-item-quantity-form').appendTo($tableRowForm);
  $("<button>").addClass("btn btn-default")
  .append($("<i>").addClass("fa fa-plus").attr("aria-hidden", "true").attr("id", "number-input").text(item.quantity)).appendTo($orderForm);
  $("<button>").addClass("btn btn-default")
  .append($("<i>").addClass("fa fa-minus").attr("aria-hidden", "true")).appendTo($orderForm);

  $('<td>')
  .append($('<p>').addClass('checkout-item-price').text("$" + item.price).data('price', item.price)).appendTo($tableRow);
  $('<td>')
  .append($('<a>').attr('href', '#').addClass('fa fa-times checkout-item-delete').attr('aria-hidden', 'true')).appendTo($tableRow);

  return $item;
}

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
