let pokemonList = [];
pokemonList = [
  { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
  { name: "Ivysaur", height: 1, types: ["grass", "poison"] },
  { name: "Venusaur", height: 2, types: ["grass", "poison"] },
];
console.log(pokemonList);
document.write
for (let i = 0; i < pokemonList.length; i++) {
  document.write(`
    ${pokemonList[i].name}  
    (Height: ${pokemonList[i].height}   
     and Type: ${pokemonList[i].types})`);
  document.write('<br>');
};
