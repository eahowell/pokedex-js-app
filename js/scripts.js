// https://pokedex.org/#/
let pokemonRepository = (function () {
  // Create the array of Pokemons
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=771";
  let keysPokemonList = ["name", "detailsUrl"];

  function add(pokemon) {
    // Verify the pokemon being passed is an object
    // Verify the pokemon being passed the keys matched the required keys
    if (
      typeof pokemon === "object" &&
      compareArrays(Object.keys(pokemon), keysPokemonList)
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Invalid pokemon object.", pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  // Loading messages
  function showLoadingMessage() {
    $("#loader").addClass("visible");
  }
  function hideLoadingMessage() {
    $("#loader").addClass("invisible");;
  }
  // let i = 0
  function addListItem(pokemon, tableBody) {
    // i = i +1
    let pokemonULList = $(".pokemon-list");
    let listItem = $("<li></li>");
    let button = $(`<button type="button" class="btn pokemonListButton" data-toggle="modal" data-target="#pokemonDetailsModalCenter">` + pokemon.name + `</button>`);
    listItem.addClass("list-group-item");
    button.on("click", function(e) {
      showDetails(pokemon);
      // console.log(pokemon)
    });
    listItem.append(button);
    pokemonULList.append(listItem);
    return addListItem;
  }

  function showDetails(pokemon) {
    showLoadingMessage();
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          hideLoadingMessage();
        });
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.abilities = details.abilities
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }
  // Modals
  function showModal(title, pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header")

    // Clear existing modal content
    modalBody.empty();
    modalTitle.empty();
   
    // Title Element
    let nameElement =  $("<h1>" + pokemon.name + "</h1>");
    

    // Height Element
    let heightElement = $("<p>" + "Height (dm): " + pokemon.height + "</p>");

    // Types Element
    let details = pokemon.types;
    let typesToString = "";
    details.forEach(function (details) {
      typesToString = typesToString + " - " + details.type.name;
    });
    let typesElement = $("<p>" + "Types: " + typesToString + "</p>");

    // Classification Element
    let classificationElement = $("<p>" + "Classification: " + getSizeClassification(pokemon.height) + "</p>");

  //  Abilities
  let abilitydetails = pokemon.abilities;
    let abilitiesToString = "";
    abilitydetails.forEach(function (abilitiesdetails) {
      abilitiesToString = abilitiesToString + " - " + abilitiesdetails.ability.name;
    });
  let abilitiesElement  = $("<p>" + "Abilities: " + abilitiesToString + "</p>");
   
    // Image
    let imageElement = $(`<img class = "modal-img img-fluid" style = "width: 50%">`);
    imageElement.attr("src", pokemon.imageUrl);
    imageElement.attr("alt", ("Picture of the Pokémon " + pokemon.name));
    imageElement.attr("title", ("Picture of the Pokémon " + pokemon.name));


    // Append to modal body
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
    modalBody.append(classificationElement);
    modalBody.append(abilitiesElement);
    
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
  };
})();

// Load Pokemon list from API
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    // Populate dropdown to filter
    var optionsPokemon = document.createElement("option");
    optionsPokemon.value = pokemon.name;
    optionsPokemon.text = pokemon.name;
    document.getElementById("pokemonsChoice").appendChild(optionsPokemon);
    pokemonRepository.hideLoadingMessage();
  });
});

// Compare two arrays
function compareArrays(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((element, index) => element === array2[index])
  );
}

// Classify Size
function getSizeClassification(height) {
  if (height < 10) return "Tiny Size";
  else if (height >= 10 && height <= 19) return "Medium Size";
  else if (height > 19) return "Large Size";
  return "Unclassified Size";
}

// Populate dropdown
document.addEventListener("DOMContentLoaded", function () {
  function updateTable() {
    pokemonRepository.showLoadingMessage();
    let choice = document.getElementById("pokemonsChoice").value;
    let pokemonULList = document.querySelector(".pokemon-list");
    // Clear list before refresh
    while (pokemonULList.firstChild) {
      pokemonULList.removeChild(pokemonULList.firstChild);
    }

    let pokemonsToShow =
      choice === "All"
        ? pokemonRepository.getAll()
        : pokemonRepository
            .getAll()
            .filter((pokemon) => pokemon.name === choice);

    // Loop through array to put the information in a table
    pokemonsToShow.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    })
    
    pokemonRepository.hideLoadingMessage();
  }
  
  document
    .getElementById("pokemonsChoice")
    .addEventListener("change", updateTable);
  updateTable();
});
