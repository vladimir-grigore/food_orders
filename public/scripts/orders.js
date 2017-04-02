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

});
