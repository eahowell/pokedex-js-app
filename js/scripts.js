// https://pokedex.org/#/
let pokemonRepository = (function () {
  // Create the array of Pokemons
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
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
    document.getElementById("loader").style.display = "block";
  }
  function hideLoadingMessage() {
    document.getElementById("loader").style.display = "none";
  }

  function addListItem(pokemon, tableBody) {
    let pokemonULList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemonListButton");
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
    listItem.classList.add("listItem");
    listItem.appendChild(button);
    pokemonULList.appendChild(listItem);

    return addListItem;
  }

  function showDetails(pokemon) {
    showLoadingMessage();
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
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
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
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
  if (height < 10) return "Tiny";
  else if (height >= 10 && height <= 19) return "Medium";
  else if (height > 19) return "Large";
  return "Unclassified";
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
    });
    pokemonRepository.hideLoadingMessage();
  }

  document
    .getElementById("pokemonsChoice")
    .addEventListener("change", updateTable);
  updateTable();
});
