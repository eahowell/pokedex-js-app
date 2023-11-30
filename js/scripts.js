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
for (let i = 0; i < pokemonList.length; i++) {
  document.write(`<tr>
        <td>${pokemonList[i].name}</td>
        <td>${pokemonList[i].height}</td>   
        <td>${pokemonList[i].types}</td>
        <td>
        `);

  // Determine the size classification based on the height
  if (pokemonList[i].height < 1) {
    document.write("Tiny");
  } else if (pokemonList[i].height >= 1 && pokemonList[i].height <= 1.9) {
    document.write("Medium");
  } else if (pokemonList[i].height > 1.9) {
    document.write("Large");
  } else {
    document.write("Unclassified");
  }

  document.write(`
            </td>  
        </tr>`);
}
document.write(`
        </tbody>
        </table>
    `);

// Footer with credits for the images used in the logo 
document.write(`
        <br>
        <br>
        <br>
        <br>
        <footer>
            Credits:
            <br>
            <a href="https://www.flaticon.com/free-icons/pokeball_287221" title="Pokemon Logo Icon">Pokemon Icon (used in logo) created by Nikita Golubev - Flaticon</a>
            <br>
            <a href="https://www.flaticon.com/free-icons/pikachu_188987" title="Pikachu Logo Icno">Pikachu Icon (used in logo) created by Roundicons Freebies - Flaticon</a>
        </footer>
    `);
