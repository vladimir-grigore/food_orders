$(() => {

  $.ajax({
    method: "GET",
    url: "/api/menu"
  }).done((menu_items) => {
    for(item of menu_items) {
      $("<div>").text(item.id).appendTo($("body"));
      $("<div>").text(item.name).appendTo($("body"));
      $("<div>").text(item.price).appendTo($("body"));
      $("<div>").text(item.description).appendTo($("body"));
      $("<div>").text(item.category_id).appendTo($("body"));
    }
  });

  $('#click-me').on('click', function(event){
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/api/menu",
      data: $(this).serialize()
    }).done();
  });

});