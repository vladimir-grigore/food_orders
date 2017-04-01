$(() => {
    function loadMenuItems() {
      $.ajax({
        method: "GET",
        url: "/api/menu"
      }).done((menu_items) => {
        renderMenuItems(menu_items);
      });
    }

  loadMenuItems();

  function renderMenuItems(menu_items) {
    $(".menu-container").empty();
    // loops through the menu_items
    // bundles every 4 menu items in a row
    $wrappingRow1 = $("<div>").addClass("row");
    $wrappingRow2 = $("<div>").addClass("row");

    counter = 0;
    for(let item of menu_items) {
      var $item = createMenuElement(item);
      if (counter < 4) {
        $wrappingRow1.append($item);
      } else {
        $wrappingRow2.append($item);
      }
      counter ++;
    }

    $(".menu-container").append($wrappingRow1);
    $(".menu-container").append($wrappingRow2);
  }

  function createMenuElement(item) {

    let $item = $("<div>").addClass("col-sm-3");
    let $article = $("<article>").addClass("menu-item").appendTo($item);
    let $image = $("<img>").attr("src", item.image_url).attr("alt", "menu-item-1").appendTo($article);

    let $orderForm = $("<form>").addClass("form-inline quantity-form").appendTo($article);
    $("<button>").addClass("btn btn-default")
    .append($("<i>").addClass("fa fa-plus").attr("aria-hidden", "true")).appendTo($orderForm);
    $("<input>").attr("type", "text").addClass("form-control number-input").attr("placeholder", "0").appendTo($orderForm);
    $("<button>").addClass("btn btn-default")
    .append($("<i>").addClass("fa fa-minus").attr("aria-hidden", "true")).appendTo($orderForm);

    let $details = $("<div>").addClass("menu-item-details").appendTo($article);
    let $detailsRow = $("<div>").addClass("row").appendTo($details);
    let $detailsCol9 = $("<div>").addClass("col-sm-9").appendTo($detailsRow);
    $("<p>").addClass("menu-item-name").text(item.name).appendTo($detailsCol9);
    $("<p>").addClass("menu-item-desc").text(item.description).appendTo($detailsCol9);
    let $detailsCol3 = $("<div>").addClass("col-sm-3").appendTo($detailsRow);
    $("<p>").addClass("menu-item-price").text("$" + item.price).appendTo($detailsCol3);

    return $item;
  }

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
