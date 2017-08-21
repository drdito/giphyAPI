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
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4f5aa4196409493995940a627c425a76&q=" + queryTerm +"&limit=10&offset=0&lang=en";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    console.log(response.data[0].images.downsized.url);
    var imageUrl = response.data[0].images.downsized.url;

    //
    var newImage = $("<img>");

    //
    newImage.attr("src", imageUrl);

    //
    $("#image-dump").prepend(newImage);
  });

}



renderButtons();

$("#add-term").on("click", function(event) {
  event.preventDefault();
  var term = $("#search-input").val().trim();
  buttons.push(term);
  renderButtons();
});

$(document).on("click", ".searches", displayGifInfo);