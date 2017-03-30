$(() => {
  $('.login').on('submit', function(event){
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "/login",
      data: $(this).serialize()
    }).done((users) => {
      for(user of users) {
        $("<div>").text('ID is:' + user.id).appendTo($("body"));
      }
    });

  });
});
