
//ajax call
var queryURL = "https://pokeapi.co/api/v2/pokemon/"

$.ajax({
    url: queryURL,
    method: "GET",
})

    .then(function(response) {
        console.log(queryURL);
        console.log(response);
        for (i=0; i<150 ; i++) {
            var pokemonLi = $("<li>")
            pokemonLi.addClass("collection-item")
            $(pokemonLi).text(response.results[i].name)
            $(pokemonLi).css('textTransform', 'capitalize');
            $("#pokemonList").append(pokemonLi)

        }
    })