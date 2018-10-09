var buttonArr = ["Stats", "Breeding", "Moves-List", "Caught"]
//ajax call
var queryURL = "https://pokeapi.co/api/v2/pokemon/"
var searched;
var indQueryURL;
var flavorTextURL;
var breedQueryURL = "https://pokeapi.co/api/v2/pokemon-species/"+searched+"/";

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
    breedQueryURL = "https://pokeapi.co/api/v2/pokemon-species/"+searched+"/"
    populateSprite(indQueryURL);
    flavorTextURL = "https://pokeapi.co/api/v2/pokemon-species/" + searched + "/";
    populateDescription(flavorTextURL);
    populateButtons(buttonArr, "waves-effect waves-light btn-small MiddleColButtons", "#buttonPlacement");

})

$(document).on("click", "#Moves-List", function () {
    $("#rightCol").empty();
    moveListButton(indQueryURL);
});

$(document).on("click", "#Breeding", function(breedQueryURL){
    $("#rightCol").empty();
    breedingButton(breedQueryURL);

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
        $(button).after(" ")
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
    url: breedQueryURL,
    method: "GET",
}).then(function (response) {
    console.log(response); 
    var breedTable = $("<table>");
    var breedTableHead = $("<thead>").html("<strong>Breeding Information</strong>");
    breedTable.append(breedTableHead);
    breedTable.addClass("centered");
    var breedRow1 = $("<tr>");
    var genderRate = $("<td>").text(response.gender_rate);
    var hatchCounter = $("<td>").text((response.hatch_counter)*255)
    breedRow1.append(genderRate);
    breedRow1.append(hatchCounter)
    $(breedTable).append(breedRow1);
    var breedRow2 = $("<tr>");
    var growthRate = $("<td>").text(response.growth_rate.name);
    //still needs egg groups
    breedRow2.append(growthRate);
    //need to append egg groups
    $(breedTable).append(breedRow2);
    $(rightCol).append(breedTable);

    })
}

// code to start the stat button // 
////////////////////////////////////////////////////


$(document).on("click","#Stats", function () {
    $("#rightCol").empty();

    $.ajax({
        url: indQueryURL,
        method: "GET"
    }).then(function (response) {
    for (i = 0; i < response.stats.length; i++) { 
        console.log(response.stats[i].stat.name);
        console.log(response.stats[i].base_stat);
        $("#rightCol").append("<div>");
        $("#rightCol").prepend("<br>");
        $("#rightCol").append( "<strong>" + response.stats[i].stat.name + "</strong>" + ":");
        $("#rightCol").append(" ");
        $("#rightCol").append(response.stats[i].base_stat);
        $("#rightCol").css('textTransform', 'capitalize');
    }
    })
    
});

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

