$(() => {
  loadPage();

  function loadPage(){
    $.ajax({
      method: "GET",
      url: "/api/orders"
    }).done((pending_orders) => {
      loadPendingOrders(pending_orders);
    });
  }

  function getTimeOfOrder(order_id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        method: "GET",
        url: `/api/orders/time/${order_id}`
      }).done((time) => {
        resolve(time[0].placed_at)
      });
    })
  }

  function completeOrder(order_id){
    $.ajax({
      method: "POST",
      url: `/api/orders/complete/${order_id}`,
      data: {order_id: order_id}
    }).done(loadPage());
  }

  function addTimeEstimate(time_estimate, order_id){
    $.ajax({
      method: "POST",
      url: `/api/orders/estimate/${order_id}`,
      data: {time: time_estimate}
    }).done();
  }

  function loadPendingOrders(pending_orders){
    var ordersObject = {};
    for(let order of pending_orders) {
      if (!ordersObject[order.order_id]){
        ordersObject[order.order_id] = {};

      }
      ordersObject[order.order_id][order.id] =  {
          "image_url": order.image_url,
          "name": order.name,
          "quantity": order.quantity
        }
    }

    $("section.orders-container > div.row").empty();
    let orderNumber = 0;
    for (let index in ordersObject){
      getTimeOfOrder(index).then((time) => {
        orderNumber ++;
        populateOrder(ordersObject[index], time, orderNumber, index).appendTo("section.orders-container > div.row");
      });
    }
  }

  // Create entry for each order
  function populateOrder(orders, time, orderNumber, order_id){
    let totalQuantity = 0;
    for(let item in orders){
      totalQuantity += orders[item].quantity;
    }

    let $order = $("<div>").addClass("col-sm-8 col-sm-offset-2 order-row");
    let $beforeSlide = $("<div>").addClass("before-slide").appendTo($order);
    let $verticalAlign = $("<div>").addClass("vertical-align").appendTo($beforeSlide);
    let $col2 = $("<div>").addClass("col-sm-2").appendTo($verticalAlign);
    $("<p>").addClass("items").text(totalQuantity + " ITEMS").appendTo($col2);
    let $orderTitle = $("<div>").addClass("col-sm-6 col-sm-offset-1 text-center").appendTo($verticalAlign);
    $("<p>").addClass("customer-order").text("customer order #" + orderNumber).appendTo($orderTitle);
    let $col3 = $("<div>").addClass("col-sm-3").appendTo($verticalAlign);
    $("<p>").addClass("time").text(time).appendTo($col3);

    let $afterReveal = $("<div>").addClass("after-reveal").appendTo($order);

    // Create entry for every item in the order
    for (let entry in orders){
      createOrderItem(orders[entry]).appendTo($afterReveal);
    }

    let $timeEstimateRow = $("<div>").addClass("row").appendTo($afterReveal);
    let $col4 = $("<div>").addClass("col-sm-12 text-center").appendTo($timeEstimateRow);
    let $form = $("<form>").addClass("estimated-time-form form-inline").data("order_id", order_id).appendTo($col4);
    let $formGroup = $("<div>").addClass("form-group").appendTo($form);
    let $input = $("<div>").addClass("input-group").appendTo($formGroup);
    $("<input>").attr("type", "text").addClass("form-control")
    .attr("id", "estimated-time-input").attr("placeholder", "Estimated time (minutes)").appendTo($input);
    $("<button>").attr("type", "submit").addClass("btn btn-time-submit").text("Submit").appendTo($form);
    $("<button>").attr("type", "submit").addClass("btn btn-complete").text("Order complete").appendTo($form);

    let $hideArrow = $("<div>").addClass("col-sm-2 col-sm-offset-5 text-center").appendTo($order);
    $("<i>").addClass("fa fa-caret-down down-arrow").attr("aria-hidden", "true").appendTo($hideArrow);

    return $order;
  }

  function createOrderItem(item) {
    $orderItem = $("<div>").addClass("row vertical-align text-center");
    $col1 = $("<div>").addClass("col-sm-4").appendTo($orderItem);
    $("<img>").addClass("customer-item-img").attr("src", item.image_url).attr("alt", "menu-item-1").appendTo($col1);
    $col2 = $("<div>").addClass("col-sm-4").appendTo($orderItem);
    $("<p>").addClass("customer-item-name").text(item.name).appendTo($col2);
    $col3 = $("<div>").addClass("col-sm-4").appendTo($orderItem);
    $("<p>").addClass("customer-item-quantity").text("x" + item.quantity).appendTo($col3);

    return $orderItem;
  }

  // Expand the orders container
  $('.orders-container').on('click','div.order-row > div.before-slide', function(event){
    event.preventDefault();
    $(this).siblings('.after-reveal').slideToggle("400");
    var collapsed = $(this).siblings().find('i').hasClass('fa-caret-down');

    $('.before-slide').siblings().find('i').removeClass('fa-caret-up');
    $('.before-slide').siblings().find('i').addClass('fa-caret-down');
    if(collapsed){
      $(this).siblings().find('i').toggleClass('fa-caret-down fa-caret-up');
    }
  })

  // Function to swap submit time button to complete order button
  $('.orders-container' ).on('submit', 'form.estimated-time-form', function(event) {
    event.preventDefault();
    let btnTimeSubmit = $(this).find('button.btn-time-submit, div.form-group');
    let btnComplete = $(this).find('button.btn-complete');
    
    let order_id = $(this).data("order_id");
    let time_estimate = $(this).find("#estimated-time-input").val();

    if (Number(time_estimate)){
      addTimeEstimate(time_estimate, order_id);
      $(btnTimeSubmit).fadeOut(300, function(){
        $(this).replaceWith(btnComplete);
        $(btnComplete).fadeIn(600);
      });
    }

    // close row aftr delay AND THEN lower opacity
    var that = $(this);
    setTimeout(function(){
      $(that).parents('.order-row').find('div.before-slide').trigger('click');
        $(that).parents('.order-row').animate({'opacity':'0.5'}, 500);
    }, 1000);
  });

  // Complete order
  $('.orders-container' ).on('click', 'button.btn-complete', function(event) {
    event.preventDefault();
    let order_id = $(this).parent("form.estimated-time-form").data("order_id");
    completeOrder(order_id);
  })

});
