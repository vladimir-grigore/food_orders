$(() => {
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  loadPage();

  function loadPage(){
    $.ajax({
      method: "GET",
      url: `/api/checkout/${id}`
    }).done((results) => {
      if (!results[0]) {
        window.location.href = `/`;
      }
      loadCheckoutItems(results);
    });
  }

  function loadCheckoutItems(results) {
    for(let item of results) {
      if (!orderObject[item.menu_item_id]){
        orderObject[item.menu_item_id] = {
          "price": item.price,
          "quantity": item.quantity,
          "menu_item_id": item.menu_item_id,
          "name": item.name,
          "perPrice": Number(item.price)/item.quantity
        };
      }
      createCheckoutElement(item).insertAfter(".col-sm-10.col-sm-offset-1 > .row.text-center.row-headings");
    }
    updateTotalPrice();
  }

  function updateTotalPrice(){
    let total = 0;
    for(let item in orderObject) {
      total += Number(orderObject[item].price);
    }
    $("p.total-price").text("$" + total.toFixed(2));
  }

  function deleteItemFromOrder(menuItemId){
    $.ajax({
      method: "POST",
      url: `/api/checkout/${id}/delete`,
      data: {menu_item_id: menuItemId}
    }).done(() => {
      window.location.href = `/checkout/${id}`;
    });
  };

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
      window.location.href = `/thankyou`;
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
      window.location.href = `/thankyou`;
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
    $("<button>").addClass("btn btn-default plus")
    .append($("<i>").addClass("fa fa-plus").attr("aria-hidden", "true")).appendTo($orderForm);
    $('<input>').attr('type', 'text').addClass("form-control number-input").val(item.quantity).appendTo($orderForm);
    $("<button>").addClass("btn btn-default minus")
    .append($("<i>").addClass("fa fa-minus").attr("aria-hidden", "true")).appendTo($orderForm);

    $('<div>').addClass('col-sm-2 checkout-price')
    .append($('<p>').addClass('checkout-item-price').text("$" + item.price).data('price', item.price)).appendTo($item);
    $('<div>').addClass('col-sm-2')
    .append($('<a>').attr('href', '#').addClass('fa fa-times checkout-item-delete').attr('aria-hidden', 'true')).appendTo($item);

    return $item;
  }

  // Handle click events for adding items to the cart
  $("div.col-sm-10.col-sm-offset-1").on('click', 'form.quantity-form > button.plus', function(event){
    event.preventDefault();
    var menuItemId = $(this).parents(".row.text-center.vertical-align.row-items").data("id");
    var $quantityField = $(this).parent().find("input.number-input");
    var quantity = Number($quantityField.val());
    $quantityField.val(quantity + 1);
    let newPrice = addMenuItemToBasket(Number(menuItemId));
    $(this).parents("div.col-sm-3").siblings(".checkout-price").find(".checkout-item-price").text("$" + newPrice);
  })

  // Handle click events for removing items from the cart
  $("div.col-sm-10.col-sm-offset-1").on('click', 'form.quantity-form > button.minus', function(event){
    event.preventDefault();
    var menuItemId = $(this).parents(".row.text-center.vertical-align.row-items").data("id");
    var $quantityField = $(this).parent().find("input.number-input");
    var value = Number($quantityField.val());
    if (value > 0) {
      $quantityField.val(value - 1);
      let newPrice = removeMenuItemFromBasket(Number(menuItemId));
      $(this).parents("div.col-sm-3").siblings(".checkout-price").find(".checkout-item-price").text("$" + newPrice);
    }
  })


  $("div.col-sm-10.col-sm-offset-1").on('click', 'a.checkout-item-delete', function(event){
    event.preventDefault();
    var menuItemId = $(this).parents(".row.text-center.vertical-align.row-items").data("id");
    deleteItemFromOrder(menuItemId);
  });

  // Hold information about the order
  function addMenuItemToBasket(menu_item_id) {
    let quantity = orderObject[menu_item_id].quantity;
    let price = Number(orderObject[menu_item_id].price);
    let perPrice = orderObject[menu_item_id].perPrice;

    price += perPrice;
    orderObject[menu_item_id].quantity += 1;
    orderObject[menu_item_id].price = price;
    updateTotalPrice();
    return price.toFixed(2);
  }

  // Remove item from basket
  function removeMenuItemFromBasket(menu_item_id) {
    let quantity = orderObject[menu_item_id].quantity;
    let price = Number(orderObject[menu_item_id].price);
    let perPrice = orderObject[menu_item_id].perPrice;

    price -= perPrice;
    orderObject[menu_item_id].quantity -= 1;
    orderObject[menu_item_id].price = price;
    updateTotalPrice();
    return price.toFixed(2);
  }
})

var orderObject = {};
