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

        $(".pCentering").show()

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


// modal
// ____________________________________________________

// https://materializecss.com/modals.html#!
// modal initialization script

$(document).ready(function () {
    $('.modal').modal();
    //$('.trigger-modal').modal();
});

// ____________________________________________________
// end modal

// firebase
// ____________________________________________________

// (function () {

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

    var database = firebase.database();

    // get elements
    var txtEmail = $('#txtEmail');
    var txtPassword = $('#txtPassword');
    var btnLogin = $('#btnLogin');
    var btnSignUp = $('#btnSignUp');
    var btnLogout = $('#btnLogout');
    console.log(btnLogin)

    $(document).on("click", "#btnSignUp", function() {
        console.log("yo")
        var email = $("#txtEmail").val();
        console.log(email)
        var pass = $("#txtPassword").val();
        var auth = firebase.auth();
        // sign in
        auth.createUserWithEmailAndPassword(email, pass);
        // promise.catch(e => console.log(e.message));
    })

    $(document).on("click", "#btnLogin", function() {
        //  get email and password
        var email = $("#txtEmail").val();
        var pass = $("#txtPassword").val();
        var auth = firebase.auth();
        // sign in
        auth.signInWithEmailAndPassword(email, pass);
    })

    
    // add login event.
    // btnLogin.addEventListener('click', e => { 
    //     //   get email and password
    //     var email = txtEmail.value;
    //     var pass = txtPassword.value;
    //     var auth = firebase.auth();
    //     // sign in
    //     auth.signInWithEmailAndPassword(email, pass);
    //     promise.catch(e => console.log(e.message));
    // });

    // sign up event
    // btnSignUp.addEventListener('click', e => {                      
    //     // get email and password
    //     // TODO: check for real email
    //     var email = txtEmail.value;
    //     console.log(txtEmail)
    //     var pass = txtPassword.value;
    //     var auth = firebase.auth();
    //     // sign in
    //     auth.createUserWithEmailAndPassword(email, pass);
    //     promise.catch(e => console.log(e.message));
    // });

    $(document).on("click", "#btnLogout", function() {

        firebase.auth().signOut();
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          console.log(user)
          $("#btnLogout").removeClass("hide");

          firebase.database().ref('users/' + uid).set({
            email: email,
            yo: "yo",
          });

          database.ref().on("value", function(snapshot) {
            console.log(snapshot.val().users[uid]);
          }, function(errorObject) {
        
        
            // In case of error this will print the error
            console.log("The read failed: " + errorObject.code);
          });

          $(document).on("click", "#Caught", function (){

            totalCaught++;
            alert("You Have Registered This Pokemon To The Pokedex");
     
        var pokeStatus = {
        totalCaught: totalCaught
        };
     
        database.ref().push(pokeStatus);
     });
     
     database.ref().on("child_added", function (childSnapshot) {
     
        var indTotalCaught = childSnapshot.val().totalCaught;
     
            $("#total-caught").text(indTotalCaught);
     });
     
     
     $(document).on("click", "#Un-Catch", function (){
     
        totalCaught--;
        alert("You Have Removed This Pokemon's Data from the PokeDex");
     
        var pokeStatus = {
        totalCaught: totalCaught
        };
     
        database.ref().push(pokeStatus);
     });
     
     database.ref().on("child_added", function (childSnapshot) {
     
        var indTotalCaught = childSnapshot.val().totalCaught;
     
            $("#total-caught").text(indTotalCaught);
     });
          // ...
        } else {
          // User is signed out.
          console.log("logged out man")
          $("#btnLogout").addClass("hide");
          // ...
        }
      });
    // add a realtime listener
    // firebase.auth().onAuthStateChanged(firebaseUser => {
    //     if(firebaseUser) {
    //         console.log(firebaseUser);
    //         btnLogout.classList.remove('hide');
    //     } else {
    //         console.log('not logged in');
    //         btnLogout.classList.add('hide');
    //     }
    // });
// }());

// _________________________________________________
// end firebase



$(function(){
function googleCustomSearch(){
    $("#searchResultsP").empty();
    pokeSearch = $("#search").val();
    console.log(pokeSearch);
    searchTextURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAROlEJFE9NLpT9iv13Sx1su58gy_3jEGU&cx=013864497768835098294:lt9wa7vtqdc&q=" + pokeSearch
    console.log(searchTextURL);
    $.ajax({
        url: searchTextURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        for (i=0;i<response.items.length;i++) {
            var itemUrl=response.items[i].formattedUrl
            var itemTitle= response.items[i].title
            $("#searchResultsP").append("<br>"+itemTitle+"<br>" + "<a target=_blank href="+itemUrl+">" +itemUrl+ "</a>"+"<br>");
        }

    })}
$(document).on("click", "#searchbutton", function() {
    $("#searchModal").modal("open")
    googleCustomSearch();
});})