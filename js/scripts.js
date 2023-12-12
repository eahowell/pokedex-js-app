let pokemonRepository = (function () {
  // Create the array of Pokemons
  let pokemonList = [];
  pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Ivysaur", height: 1, types: ["grass", "poison"] },
    { name: "Venusaur", height: 2, types: ["grass", "poison"] },
  ];
  let keysPokemonList = ["name", "height", "types"];

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
  }

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

// Set up table header
document.write(`
      <table class=tablePokemonList>
      <thead>
          <tr>
              <th> Name </th>
              <th> Height (m) </th>
              <th> Type </th>
              <th> Size </th>
          </tr>
      </thead>
      <tbody>
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
document.write(`
          </tbody>
          </table>
      `);
