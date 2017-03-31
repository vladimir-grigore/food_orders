$(() => {
  $.ajax({
    method: "GET",
    url: "/menu"
  }).done((menu_items) => {
    for(item of menu_items) {
      $("<div>").text(item.id).appendTo($(".menu-item"));
      $("<div>").text(item.name).appendTo($(".menu-item"));
      $("<div>").text(item.price).appendTo($(".menu-item"));
      $("<div>").text(item.description).appendTo($(".menu-item"));
      $("<div>").text(item.category_id).appendTo($(".menu-item"));
    }
  });

  $('.login').on('submit', function(event){
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/login",
      data: $(this).serialize()
    }).done(function(){
      window.location.href = '/'
    });
  });
});