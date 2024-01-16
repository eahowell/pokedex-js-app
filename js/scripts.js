// https://pokedex.org/#/
let pokemonRepository = (function () {
  // Create the array of Pokemons
  let pokemonList = [];
  pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Ivysaur", height: 1, types: ["grass", "poison"] },
    { name: "Venusaur", height: 2, types: ["grass", "poison"] },
    { name: "Charmander", height: 0.6, types: ["fire"] },
  ];
  let keysPokemonList = ["name", "height", "types"];

  function add(pokemon) {
    // Verify the pokemon being passed is an object
    // Verify the pokemon being passed the keys matched the required keys
    if (
      typeof pokemon === "object" &&
      compareArrays(Object.keys(pokemon), keysPokemonList)
    ) {
      pokemonList.push(pokemon);
    } else {
      alert("Invalid pokemon object.");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon, tableBody) {
      let pokemonULList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemonListButton');
      button.addEventListener('click', function(){
        showDetails(pokemon)
      })
      listItem.classList.add('listItem');
      listItem.appendChild(button);
      pokemonULList.appendChild(listItem);
      
      return addListItem
  }

  function showDetails(pokemon) {
    console.log(pokemon)
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

// Compare two arrays
function compareArrays(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((element, index) => element === array2[index])
  );
}

// Classify Size
function getSizeClassification(height) {
  if (height < 1) return "Tiny";
  else if (height >= 1 && height <= 1.9) return "Medium";
  else if (height > 1.9) return "Large";
  return "Unclassified";
}

// Populate dropdown
document.addEventListener("DOMContentLoaded", function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    var optionsPokemon = document.createElement("option");
    optionsPokemon.value = pokemon.name;
    optionsPokemon.text = pokemon.name;
    document.getElementById("pokemonsChoice").appendChild(optionsPokemon);
  });

  function updateTable() {
    let choice = document.getElementById("pokemonsChoice").value;
    let pokemonULList = document.querySelector('.pokemon-list');
    // Clear list before refresh
    while(pokemonULList.firstChild ){
      pokemonULList.removeChild( pokemonULList.firstChild );
    }

    let pokemonsToShow =
      choice === "All"
        ? pokemonRepository.getAll()
        : pokemonRepository
            .getAll()
            .filter((pokemon) => pokemon.name === choice);

    // Loop through array to put the information in a table
    pokemonsToShow.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
      
      
    });
  }

  document
    .getElementById("pokemonsChoice")
    .addEventListener("change", updateTable);
  updateTable();
});
