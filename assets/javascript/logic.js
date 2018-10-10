var buttonArr = ["Stats", "Breeding", "Moves-List", "Caught"]
//ajax call
var queryURL = "https://pokeapi.co/api/v2/pokemon/"
var searched;
var indQueryURL;
var flavorTextURL;
var breedQueryURL = "https://pokeapi.co/api/v2/pokemon-species/"+searched+"/";

var rightCol = $("#rightCol")

var isCaught = false;
var totalCaught = 0;

function emptyPrev() {
    $("#pic-pop").empty();
    $("#poke-descriptions").empty();
    $("#data-type").empty();
    $("#data-abilities").empty();
    $("#poke-name").empty();
    $("#buttonPlacement").empty();
    $("#rightCol").empty();
    $("#data-weight").empty();
    $("#data-height").empty();
}

$.ajax({
    url: queryURL,
    method: "GET",
}).then(function (response) {
    console.log(queryURL);
    console.log(response);
    for (i = 0; i < 151; i++) {
        var pokemonLi = $("<li>")
        pokemonLi.addClass("collection-item pokemon-list")
        pokemonLi.attr("data-name", response.results[i].name)
        $(pokemonLi).text(response.results[i].name)
        $(pokemonLi).css('textTransform', 'capitalize');
        $("#pokemonList").append(pokemonLi)
    }
})

$(document).on("click", ".pokemon-list", function () {
    emptyPrev();
    searched = $(this).attr("data-name")
    $("#poke-name").append("<strong>" + searched + "</strong>")
    $("#poke-name").css('textTransform', 'capitalize');
    console.log(searched)
    indQueryURL = queryURL + searched + "/";
    populateSprite(indQueryURL);
    flavorTextURL = "https://pokeapi.co/api/v2/pokemon-species/" + searched + "/";
    populateDescription(flavorTextURL);
    populateButtons(buttonArr, "waves-effect waves-light btn-small MiddleColButtons", "#buttonPlacement");

})

$(document).on("click", "#Moves-List", function (){
    $("#rightCol").empty();
    moveListButton(indQueryURL);
});

$(document).on("click", "#Stats", function (){
    $("#rightCol").empty();
    trainingButton();
});

$(document).on("click", "#Breeding", function(){
    $("#rightCol").empty();
    breedingButton();
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

        $("#data-height").append("<td>" + response.height + "</td>");
        $("#data-weight").append("<td>" + response.weight + "</td>");


        for (i = 0; i < response.types.length; i++) {
            console.log(response.types[i].type.name);
            $("#data-type").append("<td>" + response.types[i].type.name + "</td>")
        }

        for (i = 0; i < response.abilities.length; i++) {
            console.log(response.abilities[i].ability.name);
            $("#data-abilities").append("<td>" + response.abilities[i].ability.name + "</td>")
        }
    })
}

function populateDescription(flavorTextURL) {
    $.ajax({
        url: flavorTextURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        $("#poke-descriptions").append(response.flavor_text_entries[53].flavor_text);
    })
}

function populateButtons(buttonArr, classToAdd, areaToAdd) {
    $(areaToAdd).empty
    for (i = 0; i < buttonArr.length; i++) {
        var button = $("<a>")
        button.addClass(classToAdd);
        button.text(buttonArr[i]);
        button.attr("id", buttonArr[i])
        button.attr("src", "#")
        button.attr("data-name")
        $(areaToAdd).append(button);
        $(button).after(" ");
    }
}

function moveListButton(indQueryURL) {
    $.ajax({
        url: indQueryURL,
        method: "GET",
    }).then(function (response) {

        console.log(indQueryURL);
        console.log(response);

        var moveListUl = $("<ul>")
        moveListUl.addClass("collection with-header");

        var moveListTitle = $("<li>");
        moveListTitle.addClass("collection-header")
        moveListTitle.html("<strong>Move List</strong>")

        $(moveListUl).append(moveListTitle);

        for (i = 0; i < response.moves.length; i++) {
            var moves = $("<li>");
            moves.text(response.moves[i].move.name);
            moves.addClass("collection-item");
            moveListUl.append(moves);
            $("#rightCol").append(moveListUl);
        }
    })
}

function breedingButton(){

    $.ajax({
        url: flavorTextURL,
        method: "GET",
    }).then(function (response) {

        console.log(response); 
        $("#rightCol").append("<strong>" + "Egg Groups: " + "</strong>");

            for (i=0; i < response.egg_groups.length; i++) {
                console.log(response.egg_groups[i].name);
                $("#rightCol").append("<div>");
                $("#rightCol").prepend("<br>");
                $("#rightCol").append(response.egg_groups[i].name);
                $("#rightCol").append(" ");
                $("#rightCol").css('textTransform', 'capitalize');
                $("#rightCol").append("<br>");

            }

        $("#rightCol").append("<div>");
        $("#rightCol").prepend("<br>");
        $("#rightCol").append("<br>");
        $("#rightCol").append("<strong>" + "Capture Rate (out of 100): " + "</strong>");
        $("#rightCol").append(response.capture_rate);

        $("#rightCol").append("<div>");
        $("#rightCol").prepend("<br>");
        $("#rightCol").append("<br>");
        $("#rightCol").append("<strong>" + "Hatch Rate (by steps): " + "</strong>");
        $("#rightCol").append(response.hatch_counter * 255);

        $("#rightCol").append("<div>");
        $("#rightCol").prepend("<br>");
        $("#rightCol").append("<br>");
        $("#rightCol").append("<strong>" + "Growth Rate: " + "</strong>");
        $("#rightCol").append(response.growth_rate.name);
    })
}

function trainingButton () {
        $.ajax({
            url: indQueryURL,
            method: "GET"
        }).then(function (response) {
        for (i = 0; i < response.stats.length; i++) { 
            console.log(response.stats[i].stat.name);
            console.log(response.stats[i].base_stat);
            $("#rightCol").append("<div>");
            $("#rightCol").prepend("<br>");
            $("#rightCol").append("<br>");
            $("#rightCol").append( "<strong>" + response.stats[i].stat.name + "</strong>" + ":");
            $("#rightCol").append(" ");
            $("#rightCol").append(response.stats[i].base_stat);
            $("#rightCol").css('textTransform', 'capitalize');
        }
        })
    }

$(document).on("click", "#Caught", function (){
    if (isCaught === false) {
        totalCaught++;
        console.log(totalCaught);
    }

    else {
        totalCaught--;
        console.log(totalCaught);
    }
})

