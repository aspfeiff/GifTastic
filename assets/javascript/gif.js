$( document ).ready(function() {
// Create an array of strings
var shows = ["Chappelle Show", "Always Sunny in Philadelphia", "30 Rock", "Veep", "Game of Thrones", "Curb Your Enthusiasm", "The Office", "Billions", "Shameless", "Breaking Bad","Walking Dead"];



//Functions

// Display gif buttons
function displayGifButtons(){
    $("#gifsView").empty();
    for (var i = 0; i < shows.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("show");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", shows[i]);
        gifButton.text(shows[i]);
        $("#gifButtons").append(gifButton);
    }
}
// Add new show button
function addNewButton(){
    $("#addGif").on("click", function(){
    var show = $("#show-input").val().trim();
    if (show === ""){
      return false;
    }
    shows.push(show);

    $("#gifButtons").empty();

    displayGifButtons();
    return false;
    });
}

// Display gifs
function displayGifs(){
    var show = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response);
        $("#gifsView").empty();
        var results = response.data;
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>");
            gifDiv.addClass("gifDiv");
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
            gifImage.attr("data-state", "still");
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            $("#gifsView").prepend(gifDiv);
        }
    });
}

displayGifButtons();
addNewButton();

$(document).on("click", ".show", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr("data-state");
    if ( state === "still"){
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    }

    else{
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});
});