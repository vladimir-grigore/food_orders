$(() => {
    function loadMenuItems() {
      $.ajax({
        method: "GET",
        url: "/api/menu"
      }).done((menu_items) => {
        renderMenuItems(menu_items);
      });
    }

  loadMenuItems();

  // Proceed to checkout
  $("#checkout-btn").on('click', function(event){
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/api/menu",
      data: orderObject
    }).done(function(orderID){
        window.location.href = `/checkout/${orderID}`;
      }
    );
  })

  function renderMenuItems(menu_items) {
    $(".menu-container").empty();
    // loops through the menu_items
    // bundles every 4 menu items in a row
    var j = menu_items.length, chunk = 4, subset;
    for (var i=0; i < j; i += chunk) {
        subset = menu_items.slice(i, i+chunk);
        $wrappingRow = $("<div>").addClass("row");
        for(let item of subset){
          var $item = createMenuElement(item);
          $wrappingRow.append($item);
        }
        $(".menu-container").append($wrappingRow);
    }
  }

  // Handle click events for adding items to the cart
  $(".menu-container").on('click', 'form.quantity-form > button.plus', function(event){
    event.preventDefault();
    var menuName = $(this).parent().siblings(".menu-item-details").find(".menu-item-name").text();
    var menuPrice = $(this).parent().siblings(".menu-item-details").find(".menu-item-price").data("price");
    var menuItemId = $(this).parents("article.menu-item").data("id");

    var $quantityField = $(this).parent().find("input.number-input");
    var value = Number($quantityField.val());
    $quantityField.val(value + 1);
    addMenuItemToBasket(menuName, Number(menuPrice), Number(menuItemId));
  })

  // Handle click events for removing items from the cart
  $(".menu-container").on('click', 'form.quantity-form > button.minus', function(event){
    event.preventDefault();
    var menuName = $(this).parent().siblings(".menu-item-details").find(".menu-item-name").text();
    var menuPrice = $(this).parent().siblings(".menu-item-details").find(".menu-item-price").data("price");
    var $quantityField = $(this).parent().find("input.number-input");
    var value = Number($quantityField.val());
    if (value > 0) {
      $quantityField.val(value - 1);
      removeMenuItemFromBasket(menuName, Number(menuPrice));
    }
  })

  function createMenuElement(item) {

    let $item = $("<div>").addClass("col-sm-3");
    let $article = $("<article>").addClass("menu-item").data('id', item.id).appendTo($item);
    let $image = $("<img>").attr("src", item.image_url).attr("alt", "menu-item-1").appendTo($article);

    let $orderForm = $("<form>").addClass("form-inline quantity-form").appendTo($article);
    $("<button>").addClass("btn btn-default plus")
    .append($("<i>").addClass("fa fa-plus").attr("aria-hidden", "true")).appendTo($orderForm);
    $("<input>").attr("type", "text").addClass("form-control number-input").attr("placeholder", "0").val(0).appendTo($orderForm);
    $("<button>").addClass("btn btn-default minus")
    .append($("<i>").addClass("fa fa-minus").attr("aria-hidden", "true")).appendTo($orderForm);

    let $details = $("<div>").addClass("menu-item-details").appendTo($article);
    let $detailsRow = $("<div>").addClass("row").appendTo($details);
    let $detailsCol9 = $("<div>").addClass("col-sm-9").appendTo($detailsRow);
    $("<p>").addClass("menu-item-name").text(item.name).appendTo($detailsCol9);
    $("<p>").addClass("menu-item-desc").text(item.description).appendTo($detailsCol9);
    let $detailsCol3 = $("<div>").addClass("col-sm-3").appendTo($detailsRow);
    $("<p>").addClass("menu-item-price").text("$" + item.price).data('price', item.price).appendTo($detailsCol3);

    return $item;
  }

});

// Add item to basket

function addMenuItemToBasket(title, price, id) {
  if(!orderObject[title]){
    orderObject[title] = {
      "id": id,
      "quantity": 1,
      "price": price
    }
  } else {
      orderObject[title].quantity += 1;
      orderObject[title].price += price;
  }
}

// Remove item from basket
function removeMenuItemFromBasket(title, price) {
  orderObject[title].quantity -= 1;
  orderObject[title].price -= price;
  if (orderObject[title].quantity === 0){
    delete orderObject[title];
  }
}

// Hold information about the order
var orderObject = {};
