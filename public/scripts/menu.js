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
    $("section .menu-container").empty();
    // loops through the menu_items
    for(let item of menu_items) {
      var $item = createMenuElement(item);
      console.log($item);
      $(".menu-container").append($item);
    }
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
    $("<div>").addClass("menu-item-name").text(item.name).appendTo($detailsCol9);
    $("<div>").addClass("menu-item-desc").text(item.description).appendTo($detailsCol9);
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