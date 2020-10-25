$(function () {
  $(".devourBtn").on("click", function (event) {
    var id = $(this).data("id");
    var newDevourState = {
      devoured: true,
    };
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState,
    }).then(function () {
      location.reload();
    });
  });
  $(".addBurger").on("click", function (event) {
    event.preventDefault();
    var newBurger = {
      burger_name: $("#burgerName").val().trim(),
    };
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      location.reload();
    });
  });
  $(".deleteBtn").on("click", function (event) {
    event.preventDefault();
    $.ajax("/api/burgers/all", {
      type: "DELETE",
    }).then(function () {
      location.reload();
    });
  });
});
