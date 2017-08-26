var buttons = ["baseball", "football", "soccer", "St. Louis Cardinals", "field goal", "Lebron James", "Steph Curry", "three pointer", "homerun", "World Series"];

function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < buttons.length; i++) {
    var a = $("<button>");
    a.addClass("searches");
    a.attr("data-search", buttons[i]);
    a.text(buttons[i]);
    $("#buttons-view").append(a);
  }
}

function displayGifInfo() {
  var queryTerm = $(this).attr("data-search");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4f5aa4196409493995940a627c425a76&q=" + queryTerm + "&limit=10&offset=0&rating=PG&lang=en"
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    for (var x = 0; x < response.data.length; x++) {
      var imageUrl = response.data[x].images.fixed_height_still.url;
      var newImage = $("<img>");
      newImage.addClass("imageSearch");
      newImage.attr("src", imageUrl);
      newImage.attr("data-state", "still");
      newImage.attr("image-still", imageUrl);
      newImage.attr("image-animate", response.data[x].images.fixed_height.url);
      $("#image-dump").prepend("<span class='ratingSpan'> Rating: " + response.data[x].rating + "</span>");
      $("#image-dump").prepend(newImage);
    }
  });
  $("#image-dump").empty();
}

renderButtons();

$("#add-term").on("click", function(event) {
  event.preventDefault();
  var term = $("#search-input").val().trim();
  buttons.push(term);
  renderButtons();
  $("#search-input").val("");
});

$(document).on("click", ".searches", displayGifInfo);

$(document).on("click", ".imageSearch", function animateGif() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("image-animate"));
    $(this).attr("data-state", "animate");
  }
  else if (state === "animate") {
  	$(this).attr("src", $(this).attr("image-still"));
  	$(this).attr("data-state", "still");
  }
});