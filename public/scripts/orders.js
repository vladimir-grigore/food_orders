$(() => {

  // TODO wrap get call in a method

  $.ajax({
    method: "GET",
    url: "/api/orders"
  }).done((pending_orders) => {
    for(order of pending_orders) {
      console.log("====", order);

      // $("<div>").text(item.id).appendTo($("body")); // will use the .data('id', item.id) jQuery function
      // $("<div>").text(item.payment_option).appendTo($("body"));
      // $("<div>").text(item.placed_at).appendTo($("body"));
    }
  });

  function populateOrder() {

  }

  function createOrderItem(item) {
    $orderItem = $("<div>").addClass("row vertical-align text-center");
    $col1 = $("<div>").addClass("col-sm-4").appendTo($orderItem);
    $("<img>").addClass("customer-item-img").attr("src", item.image_url).attr("alt", "menu-item-1").appendTo($col1);
    $col2 = $("<div>").addClass("col-sm-4").appendTo($orderItem);
    $("<p>").addClass("customer-item-name").text(item.name).appendTo($col2);
    $col3 = $("<div>").addClass("col-sm-4").appendTo($orderItem);
    $("<p>").addClass("customer-item-quantity").text("x" + item.quantity).appendTo($col3);    

    return $orderItem;
  }

  // $('MENU_ITEM').on('click', function(event){
  //   event.preventDefault();
  //   order_id = get order ID from data attribute

  //   $.ajax({
  //     method: "POST",
  //     url: "/api/orders",
  //     data: $(this).serialize()
  //   }).done(
  //     // TODO rediret to the GET /admin/orders/:id route
  //   );
  // });
  
  toggleCheckout();
});

function toggleCheckout(){
  $('.before-slide').on('click', function(){
    $(this).siblings('.after-reveal').slideToggle("400");
    var collapsed = $(this).siblings().find('i').hasClass('fa-caret-down');

    $('.before-slide').siblings().find('i').removeClass('fa-caret-up');
    $('.before-slide').siblings().find('i').addClass('fa-caret-down');
    if(collapsed)
        $(this).siblings().find('i').toggleClass('fa-caret-down fa-caret-up')
  });
}
