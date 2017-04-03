$(() => {

  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  var orderObject = {};

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
            "menu_item_id": item.menu_item_id
          };
        }
        createCheckoutElement(item).insertAfter(".col-sm-10.col-sm-offset-1 > .row.text-center.row-headings");
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



function createCheckoutElement (item){
  let $item = $('<div>').addClass('row text-center vertical-align row-items').data('id', item.menu_item_id);
  $('<div>').addClass('col-sm-2')
  .append($('<img>').attr('src', item.image_url).attr('alt', 'menu-item-1')).appendTo($item);
  $('<div>').addClass('col-sm-3')
  .append($('<p>').addClass('checkout-item-name').text(item.name)).appendTo($item);

  let $tableRowForm = $('<div>').addClass('col-sm-3').appendTo($item);

  let $orderForm = $('<form>').addClass('form-inline quantity-form').appendTo($tableRowForm);
  $("<button>").addClass("btn btn-default")
  .append($("<i>").addClass("fa fa-plus").attr("aria-hidden", "true")).appendTo($orderForm);
  $('<input>').attr('type', 'text').addClass("form-control number-input").val(item.quantity).appendTo($orderForm);
  $("<button>").addClass("btn btn-default")
  .append($("<i>").addClass("fa fa-minus").attr("aria-hidden", "true")).appendTo($orderForm);

  $('<div>').addClass('col-sm-2')
  .append($('<p>').addClass('checkout-item-price').text("$" + item.price).data('price', item.price)).appendTo($item);
  $('<div>').addClass('col-sm-2')
  .append($('<a>').attr('href', '#').addClass('fa fa-times checkout-item-delete').attr('aria-hidden', 'true')).appendTo($item);

  console.log(item.menu_item_id);
  return $item;
}

// Handle click events for adding items to the cart
// $(".checkout-container").on('click', 'form .checkout-item-quantity-form > button.plus', function(event){
//   event.preventDefault();
//   var menuName = $(this).parent().siblings(".checkout-item-row").find(".checkout-item-name").text();
//   var menuPrice = $(this).parent().siblings(".checkout-item-row").find(".checkout-item-price").data("price");
//   var menuItemId = $(this).parents("tr").data("id"); //****

//   var $quantityField = $(this).parent().find("input.number-input");
//   var value = Number($quantityField.val());
//   $quantityField.val(value + 1);
//   addMenuItemToBasket( Number(menuPrice), Number(menuItemId));
// })

// // Handle click events for removing items from the cart
// $(".checkout-container").on('click', 'form.checkout-item-quantity-form > button.minus', function(event){
//   event.preventDefault();
//   var menuName = $(this).parent().siblings(".checkout-item-row").find(".checkout-item-name").text();
//   var menuPrice = $(this).parent().siblings(".checkout-item-row").find(".checkout-item-price").data("price");
//   var $quantityField = $(this).parent().find("input.number-input");
//   var value = Number($quantityField.val());
//   if (value > 0) {
//     $quantityField.val(value - 1);
//     removeMenuItemFromBasket(menuName, Number(menuPrice));
//   }
// })

// Handle click events for adding items to the cart
$(".container").on('click', 'form.quantity-form > button.plus', function(event){
  event.preventDefault();
  var menuItemId = $(this).parents(".row.text-center.vertical-align.row-items").data("id"); //****
  console.log(menuItemId)
  var $quantityField = $(this).parent().find("input.number-input");
  var value = Number($quantityField.val());
  $quantityField.val(value + 1);
  // addMenuItemToBasket(Number(menuItemId));
})

// Handle click events for removing items from the cart
$(".container").on('click', 'form.quantity-form > button.minus', function(event){
  event.preventDefault();
  var menuItemId = $(this).parents(".row.text-center.vertical-align.row-items").data("id");
  var $quantityField = $(this).parent().find("input.number-input");
  var value = Number($quantityField.val());
  if (value > 0) {
    $quantityField.val(value - 1);
    // removeMenuItemFromBasket(Number(menuItemId));
  }
})

});


// Hold information about the order
// function addMenuItemToBasket(menu_item_id) {
//   let price = orderObject[menu_item_id].price
//   let quantity = orderObject[menu_item_id].quantity
//   let perPrice = price/quantity

//   if(!orderObject[menu_item_id]){
//     orderObject[menu_item_id] = {
//       "id": menu_item_id,
//       "quantity": quantity,
//       "price": price
//     }
//   } else {
//     quantity += 1;
//     price += perPrice;
//   }
// }

// Remove item from basket
// function removeMenuItemFromBasket(menu_item_id) {
//   let price = orderObject[menu_item_id].price
//   let quantity = orderObject[menu_item_id].quantity
//   let perPrice = price/quantity

//   quantity -= 1;
//   price -= perPrice;
//   // if (orderObject[item.menu_item_id].quantity === 0){
//   //   delete orderObject[item.menu_item_id];
//   // }
// }

// function addMenuItemToBasket(menu_item_id, quantity) {
//   let price =  orderObject[menu_item_id].price
//   let quantity =  orderObject[menu_item_id].quantity
//   let perPrice = price/quantity

//   if(!orderObject[menu_item_id]){
//     orderObject[menu_item_id] = {
//       "id": menu_item_id,
//       "quantity": quantity,
//       "price": price
//     }
//   } else {
//     orderObject[menu_item_id].quantity += 1;
//     orderObject[menu_item_id].price += perPrice;
//   }
// }

// // Remove item from basket
// function removeMenuItemFromBasket(title, price) {
//   let price =  orderObject[menu_item_id].price
//   let quantity = orderObject[menu_item_id].quantity
//   let perPrice = price/quantity

//   quantity -= 1;
//   price -= perPrice;
//   // if (orderObject[menu_item_id].quantity === 0){
//   //   delete orderObject[menu_item_id];
//   // }
// }

