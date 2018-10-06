
//ajax call
var queryURL = "https://pokeapi.co/api/v2/pokemon/"
var searched;
var indQueryURL;
$.ajax({
    url: queryURL,
    method: "GET",
})

    .then(function (response) {
        console.log(queryURL);
        console.log(response);
        for (i = 0; i < 150; i++) {
            var pokemonLi = $("<li>")
            pokemonLi.addClass("collection-item")
            pokemonLi.attr("data-name", response.results[i].name)
            $(pokemonLi).text(response.results[i].name)
            $(pokemonLi).css('textTransform', 'capitalize');
            $("#pokemonList").append(pokemonLi)

        }
    })

$(document).on("click", ".collection-item", function () {
    $("#pic-pop").empty();
    searched = $(this).attr("data-name")
    console.log(searched)
    indQueryURL = queryURL + searched + "/";
    populateSprite(indQueryURL);


})

function populateSprite(indQueryURL) {
    $.ajax({
        url: indQueryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)
        var imageCreate = $("<img>");
        imageCreate.attr("src", response.sprites.front_default);
        $("#pic-pop").append(imageCreate);

    })
}
