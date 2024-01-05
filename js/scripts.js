// https://pokedex.org/#/
let pokemonRepository = (function () {
  // Create the array of Pokemons
  let pokemonList = [];
  pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Ivysaur", height: 1, types: ["grass", "poison"] },
    { name: "Venusaur", height: 2, types: ["grass", "poison"] },
  ];
  let keysPokemonList = ["name", "height", "types"];

  function add(pokemon) {
    // Verify the pokemon being passed is an object
    if (typeof pokemon === "object") {
      let keyCheck = Object.keys(pokemon);
      // Verify the pokemon being passed the keys matched the required keys
      if (compareArrays(keyCheck, keysPokemonList)) {
        pokemonList.push(pokemon);
      } else {
        alert(
          "Keys did not match the Pokemon being added, please make sure you follow the proper formoat ['name', 'height', 'types']"
        );
      }
    } else {
      alert("Item being added is not an object.");
    }
  }

  function getAll() {
    return pokemonList;
  }
  return {
    add: add,
    getAll: getAll,
  };
})();

// Add a pokemon to the repository
// console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Charmander", height: 0.6, types: ["fire"] });

// Compare two arrays
function compareArrays(array1, array2) {
  if (
    array1.length === array2.length &&
    array1.every((element, index) => element === array2[index])
  ) {
    return true;
  } else {
    return false;
  }
};

// Populate dropdown
pokemonRepository.getAll().forEach(function (pokemon) {
  var optionsPokemon = document.createElement("option");
  optionsPokemon.value = pokemon.name;
  optionsPokemon.text = pokemon.name;
  pokemonsChoice.add(optionsPokemon);
});

// Set up table header
document.write(`
      <table class="tablePokemonList" id="tablePokemonList">
      <thead>
          <tr>
              <th> Name </th>
              <th> Height (m) </th>
              <th> Type </th>
              <th> Size </th>
          </tr>
      </thead>
      <tbody id="tablePokemonListBody">
      `);
      // Loop through array to put the information in a table
  pokemonRepository.getAll().forEach(function (pokemon) {
    document.write(`<tr>
          <td>${pokemon.name}</td>
          <td>${pokemon.height}</td>   
          <td>${pokemon.types}</td>
          <td>
          `);

    // Determine the size classification based on the height
    if (pokemon.height < 1) {
      document.write("Tiny");
    } else if (pokemon.height >= 1 && pokemon.height <= 1.9) {
      document.write("Medium");
    } else if (pokemon.height > 1.9) {
      document.write("Large");
    } else {
      document.write("Unclassified");
    }
    document.write(`
              </td>  
          </tr>`);
  });

var choice = "All";
function setChoice() {
  choice = document.getElementById("pokemonsChoice").value;
  console.log(choice);
  console.log(choice);

if (
  choice === "All"
) {
  // Loop through array to put the information in a table
  pokemonRepository.getAll().forEach(function (pokemon) {
    document.write(`<tr>
          <td>${pokemon.name}</td>
          <td>${pokemon.height}</td>   
          <td>${pokemon.types}</td>
          <td>
          `);

    // Determine the size classification based on the height
    if (pokemon.height < 1) {
      document.write("Tiny");
    } else if (pokemon.height >= 1 && pokemon.height <= 1.9) {
      document.write("Medium");
    } else if (pokemon.height > 1.9) {
      document.write("Large");
    } else {
      document.write("Unclassified");
    }
    document.write(`
              </td>  
          </tr>`);
  });
} else {
  let filteredRepository = pokemonRepository.getAll().filter((pokemon) => pokemon.name === choice );
  // console.log(filteredRepository)
  
  filteredRepository.forEach(function (fpokemon) {
    document.write(`<tr>
                        <td>${fpokemon.name}</td>
                        <td>${fpokemon.height}</td>   
                        <td>${fpokemon.types}</td>
                        <td>
                        `);

    // Determine the size classification based on the height
    if (fpokemon.height < 1) {
      document.write("Tiny");
    } else if (fpokemon.height >= 1 && fpokemon.height <= 1.9) {
      document.write("Medium");
    } else if (fpokemon.height > 1.9) {
      document.write("Large");
    } else {
      document.write("Unclassified");
    }
    document.write(`
                            </td>  
                        </tr>`);
  });
}}
document.write(`
          </tbody>
          </table>
      `);
