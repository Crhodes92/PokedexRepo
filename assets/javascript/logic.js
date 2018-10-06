
//ajax call
var queryURL = "https://pokeapi.co/api/v2/pokemon/"
var searched;
var indQueryURL;
var flavorTextURL;


function emptyPrev () {
    $("#pic-pop").empty();
    $("#poke-descriptions").empty();
    $("#data-type").empty();
    $("#data-abilities").empty();
    $("#poke-name").empty();
    // $("#buttonPlacement").empty();
}

$.ajax({
    url: queryURL,
    method: "GET",
}).then(function (response) {
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
    emptyPrev();
    searched = $(this).attr("data-name")
    $("#poke-name").append("<strong>" + searched + "</strong>")
        $("#poke-name").css('textTransform', 'capitalize');
    console.log(searched)
    indQueryURL = queryURL + searched + "/";
        populateSprite(indQueryURL);
    flavorTextURL = "https://pokeapi.co/api/v2/pokemon-species/" + searched + "/";
        populateDescription (flavorTextURL);
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

       console.log(response.height);
       console.log(response.weight);


       for (i=0; i < response.types.length; i++) {
            console.log(response.types[i].type.name);
            $("#data-type").append("<td>" + response.types[i].type.name + "</td>")
       }

       for (i=0; i < response.abilities.length; i++) {
            console.log(response.abilities[i].ability.name);
            $("#data-abilities").append("<td>" + response.abilities[i].ability.name + "</td>")
       }
    })
}

function populateDescription (flavorTextURL) {
    $.ajax({
        url: flavorTextURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        $("#poke-descriptions").append(response.flavor_text_entries[53].flavor_text);
    })
}

