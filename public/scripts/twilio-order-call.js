$(() => {
  $('.btn.checkout').on('click', function(){

    $.post('/api/checkout/:id')
  })

});
