$(() => {
  $('#order').on('click', function(){

    $.post('/api/orders')
  })

});
