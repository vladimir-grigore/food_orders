var url = window.location.pathname;
var id = url.substring(url.lastIndexOf('/') + 1);

$(() => {
  $('.btn.checkout').on('click', function(){

    $.post('/api/checkout/'+id)
  })

});
