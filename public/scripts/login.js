$(() => {
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
