var url = window.location.pathname;
var id = url.substring(url.lastIndexOf('/') + 1);

$(() => {

  $.ajax({
    method: "GET",
    url: "/api/checkout/" + id
  }).done((users) => {
      console.log(users);
    // for(user of users) {
    //   $("<div>").text(user.first_name).appendTo($("body"));
    //   $("<div>").text(user.last_name).appendTo($("body"));
    //   $("<div>").text(user.username).appendTo($("body"));
    //   $("<div>").text(user.phone_number).appendTo($("body"));
    // }
  });

});
