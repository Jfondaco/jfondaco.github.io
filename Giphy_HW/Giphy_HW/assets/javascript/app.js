//need to make buttons useable (targetting "data-animal" wont work)

var myApiKey = "pX0pNhnwuykIYK97TqpLKTlJs3u3TXY8";

var topics = [];

//create buttons with search button and add buttons to array
$("#submit-button").on("click", function(){
    event.preventDefault();
	var tag = $("#animal-search").val().trim();
	topics.push(tag);
    makeButtons();
    console.log(topics);
});


//on click for buttons
//my problem is in this function
$(document).on("click", "button", function(){
    console.log("test")
    event.preventDefault();
    var tag = $(this).attr("data-animal"); //what does "this" return here, I know its a button but whats its "value"?? Should I use data-animal??
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+tag+"&api_key="+myApiKey+"&random?";
    console.log(queryURL);

    //get GIF results from API
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response){
        var results = response.data
        console.log(results);

        for (var i = 0; i < 10; i++){
            var animalDiv = $("<div>");
            var animalImg = $("<img>");
            var animalP = $("<p>")

            animalP.text("Rating: " + results[i].rating);
            animalImg.attr("src", results[i].images.original_still.url);
			animalImg.attr("data-stop", results[i].images.original_still.url);
    		animalImg.attr("data-play", results[i].images.original.url);
            animalImg.attr("data-current", "still");
            animalImg.attr("class", "gif")
                
            animalDiv.append(animalP);
            animalDiv.append(animalImg);
            $("#images-here").prepend(animalDiv);
        }
    });
});

// create the buttons and append to my html
function makeButtons() {
    $("#buttons-here").empty();
        for (i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.attr("data-animal", topics[i]);
            $("#buttons-here").append(a);
            a.text(topics[i]);
        }
}

// change gifs from playing to stopped
function startStop(){
    var current = $(this).attr("data-current");
    var animate = $(this).attr("data-play");
    var still = $(this).attr("data-stop");

    if (current == "still") {
        $(this).attr("src", animate);
        $(this).attr("data-current", "animate");
    }

    else {
        $(this).attr("src", still);
        $(this).attr("data-current", "still");
    }
}

$(document).on("click", ".gif", startStop);