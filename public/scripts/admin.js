$(() => {

  // TODO wrap get call in a method

  $.ajax({
    method: "GET",
    url: "/api/admin"
  }).done((order_items) => {
    for(item of order_items) {
      $("<div>").text(item.id).appendTo($("body"));
      $("<div>").text(item.payment_option).appendTo($("body"));
      $("<div>").text(item.placed_at).appendTo($("body"));
    }
  });

  // $('#click-me').on('click', function(event){
  //   event.preventDefault();

  //   $.ajax({
  //     method: "POST",
  //     url: "/api/menu",
  //     data: $(this).serialize()
  //   }).done(
  //     // TODO rediret to the GET route
  //   );
  // });

});