// Create the array of Pokemons
let pokemonList = [];
pokemonList = [
  { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
  { name: "Ivysaur", height: 1, types: ["grass", "poison"] },
  { name: "Venusaur", height: 2, types: ["grass", "poison"] },
];
console.log(pokemonList);

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
pokemonList.forEach(function(pokemon) {
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


