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
    button.addEventListener("click", () => {
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
        hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        hideLoadingMessage();
      });
  }
  // Modals
  function showModal(title, pokemon) {
    let modalContainer = document.getElementById("modal-container");
    // Clear existing modal content
    modalContainer.innerHTML = "";
    // Create new modal element
    let modal = document.createElement("div");
    modal.classList.add("modal");
    // Add the new modal content
    // Close Button
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    // Title Element
    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    // Height Element
    let heightElement = document.createElement("p");
    heightElement.innerText = "Height (decimeters): " + pokemon.height;

    // Types Element
    let typesElement = document.createElement("p");
    let details = pokemon.types;
    let typesToString = "";
    details.forEach(function (details) {
      typesToString = typesToString + " " + details.type.name;
    });
    typesElement.innerText = "Types: " + typesToString;

    // Classification Element
    let classificationElement = document.createElement("p");
    classificationElement.innerText =
      "Classification: " + getSizeClassification(pokemon.height);

    // Image
    let imageElement = new Image();
    imageElement.classList.add("modal-image");
    imageElement.src = pokemon.imageUrl;

    // Create div for details
    let detailsDiv = document.createElement("div");
    detailsDiv.classList.add("modal-details");

    //  Create div for the body
    let bodyDiv = document.createElement("div");
    bodyDiv.classList.add("modal-body");

    //  Create div for the Header
    let headerDiv = document.createElement("div");
    headerDiv.classList.add("modal-header");

    // Append to modal container
    headerDiv.appendChild(closeButtonElement);
    headerDiv.appendChild(titleElement);
    detailsDiv.appendChild(heightElement);
    detailsDiv.appendChild(typesElement);
    detailsDiv.appendChild(classificationElement);
    bodyDiv.appendChild(detailsDiv);
    bodyDiv.appendChild(imageElement);
    modal.appendChild(headerDiv);
    modal.appendChild(bodyDiv);
    modalContainer.appendChild(modal);
    modalContainer.classList.add("is-visible");

    modalContainer.addEventListener("click", (e) => {
      // Since this is also triggered when clicking INSIDE the modal, we only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  function hideModal() {
    let modalContainer = document.getElementById("modal-container");
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

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
