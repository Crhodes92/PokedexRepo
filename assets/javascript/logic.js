var buttonArr = ["Training", "Breeding", "Moves-List"]
//ajax call
var queryURL = "https://pokeapi.co/api/v2/pokemon/"
var searched;
var indQueryURL;
var flavorTextURL;


function emptyPrev() {
    $("#pic-pop").empty();
    $("#poke-descriptions").empty();
    $("#data-type").empty();
    $("#data-abilities").empty();
    $("#poke-name").empty();
    $("#buttonPlacement").empty();
    $("#rightCol").empty();
}

$.ajax({
    url: queryURL,
    method: "GET",
}).then(function (response) {
    console.log(queryURL);
    console.log(response);
    for (i = 0; i < 151; i++) {
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
    populateDescription(flavorTextURL);
    populateButtons(buttonArr, "waves-effect waves-light btn-small MiddleColButtons", "#buttonPlacement");

})

$(document).on("click", "#Moves-List", function () {
    $("#rightCol").empty();
    moveListButton(indQueryURL);
});

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

// modal
// ____________________________________________________

// https://materializecss.com/modals.html#!
// modal initialization script

$(document).ready(function () {
    $('.modal').modal();
    $('.trigger-modal').modal();
});

// ____________________________________________________
// end modal

// firebase
// ____________________________________________________

(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAN2geARSD-dzL6PJYPIAKAVKHoZHjgdjg",
        authDomain: "pokedex-project.firebaseapp.com",
        databaseURL: "https://pokedex-project.firebaseio.com",
        projectId: "pokedex-project",
        storageBucket: "pokedex-project.appspot.com",
        messagingSenderId: "867995910313"
    };
    firebase.initializeApp(config);

    // get elements
    var txtEmail = document.getElementById('txtEmail');
    var txtPassword = document.getElementById('txtPassword');
    var btnLogin = document.getElementById('btnLogin');
    var btnSignUp = document.getElementById('btnSignUp');
    var btnLogout = document.getElementById('btnLogout');

    // add login event
    btnLogin.addEventListener('click', e => {
        //   get email and password
        var email = txtEmail.value;
        var pass = txtPassword.value;
        var auth = firebase.auth();
        // sign in
        auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    // sign up event
    btnSignUp.addEventListener('click', e => {
        // get email and password
        // TODO: check for real email
        var email = txtEmail.value;
        var pass = txtPassword.value;
        var auth = firebase.auth();
        // sign in
        auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            btnLogout.classList.remove('hide');
        } else {
            console.log('not logged in');
            btnLogout.classList.add('hide');
        }
    });
}());

// _________________________________________________
// end firebase