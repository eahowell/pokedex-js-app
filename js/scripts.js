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
}

// Populate dropdown
pokemonRepository.getAll().forEach(function (pokemon) {
  var optionsPokemon = document.createElement("option");
  optionsPokemon.value = pokemon.name;
  optionsPokemon.text = pokemon.name;
  pokemonsChoice.add(optionsPokemon);
});

function setChoice() {
  let choice = document.getElementById("pokemonsChoice").value;
  choice.value = this.name;
  choice.innerText = this.name;
  console.log(choice);
}

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
document.write(`
          </tbody>
          </table>
      `);

// This below was my initial attempt at a few different ways to try to filter the table.
// function setChoice () {
//   let choice = document.getElementById("pokemonsChoice").value
//   choice.value = this.name
//   choice.innerText  = this.name

//   // let table = document.getElementById("tablePokemonList");
//   // Get the table body element in which you want to add row
//   let table = document.getElementById("tablePokemonListBody");

//   // Create row element
//   let row = document.createElement("tr");

//   console.log(choice)
//   if (
//     choice.innerText === "All"
//     ) {

//       // Loop through array to put the information in a table
//     pokemonRepository.getAll().forEach(function (pokemon) {
//       // let row = table.insertRow(-1);
//       let c1 = document.createElement("td");
//       let c2 = document.createElement("td");
//       let c3 = document.createElement("td");
//       let c4 = document.createElement("td");

//       c1.innerText = pokemon.name;
//       c2.innerText = pokemon.height;
//       c3.innerText = pokemon.types;
//       row.appendChild(c1);
//       row.appendChild(c2);
//       row.appendChild(c3);
//       row.appendChild(c4);
//       // Append row to table body
//       table.appendChild(row)
//       // determineSize(pokemon, c4);
//   })
// } else {
//   let filteredRepository = pokemonRepository.getAll().filter((pokemon) => pokemon.name = choice.name)
//     // let row = table.insertRow(-1);
//     let c1 = row.insertCell(0);
//     let c2 = row.insertCell(1);
//     let c3 = row.insertCell(2);
//     let c4 = row.insertCell(3);

//     c1.innerText = filteredRepository[0];
//     c2.innerText = filteredRepository[1];
//     c3.innerText = filteredRepository[2];
//     // determineSize(pokemon, c4);
//   }

// };
//   // Determine the size classification based on the height
//   function determineSize (pokemon, c) {

//   if (pokemon.height < 1) {
//       c4.innerText = "Tiny";
//   } else if (pokemon.height >= 1 && pokemon.height <= 1.9) {
//     c4.innerText = "Medium";
//   } else if (pokemon.height > 1.9) {
//     c4.innerText = "Large";
//   } else {
//     c4.innerText ="Unclassified";
//   }
// }
