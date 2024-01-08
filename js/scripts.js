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
  return {
    add: add,
    getAll: getAll,
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

  // Set up table header
  var table = document.createElement("table");
  table.className = "tablePokemonList";
  table.innerHTML = `
    <thead>
      <tr>
        <th> Name </th>
        <th> Height (m) </th>
        <th> Type </th>
        <th> Size </th>
      </tr>
    </thead>
    <tbody id="tablePokemonListBody">
    </tbody>`;
  document.body.appendChild(table);

  function updateTable() {
    let choice = document.getElementById("pokemonsChoice").value;
    let tableBody = document.getElementById("tablePokemonListBody");
    tableBody.innerHTML = "";

    let pokemonsToShow =
      choice === "All"
        ? pokemonRepository.getAll()
        : pokemonRepository
            .getAll()
            .filter((pokemon) => pokemon.name === choice);

    // Loop through array to put the information in a table
    pokemonsToShow.forEach(function (pokemon) {
      let row = document.createElement("tr");
      row.innerHTML = `
        <td>${pokemon.name}</td>
        <td>${pokemon.height}</td>
        <td>${pokemon.types.join(", ")}</td>
        <td>${getSizeClassification(pokemon.height)}</td>`;
      tableBody.appendChild(row);
    });
  }

  document
    .getElementById("pokemonsChoice")
    .addEventListener("change", updateTable);
  updateTable();
});
