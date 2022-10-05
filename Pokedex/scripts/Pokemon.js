let pokemonCount = 21;
let countStart = 1;
let pokedex = {};


window.onload = async function() {
    await render(countStart);
}


function loadMore() {
    pokemonCount = pokemonCount + 20 + 1;
    countStart = countStart + 20 + 1;
    if (pokemonCount >= 493) {
        pokemonCount = 493;
    }
    render(pokemonCount);
}


async function render() {
    for (let i = countStart; i <= pokemonCount; i++) {
        await getPokemon(i);
        let pokemon = document.createElement("div");
        pokemon.id = i;
        pokemon.innerText = pokedex[i]["name"].toUpperCase();
        pokemon.src += pokedex[i]["navSprite"];
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatepokemon);
        document.getElementById("pokemon_list").append(pokemon);
        let spriteDiv = document.createElement("div");
        var dexSpirte = document.createElement("img");
        dexSpirte.classList.add("sprite");
        dexSpirte.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${i}.png`;
        spriteDiv.appendChild(dexSpirte);
        pokemon.appendChild(spriteDiv);
    };
    document.getElementById("pokemon_decription").innerText = pokedex[1]["desc"];
}


// get information from the selected Pokemon
async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    let res = await fetch(url);
    let pokemon = await res.json();
    initStats(pokemon);
    initDetails(pokemon)
    await initText(pokemon);
    pokedex[num] = { "name": pokemonName, "img": pokemonImg, "types": pokemonType, "desc": pokemonDesc, "hp": hp, "atk": atk, "def": def, "spatk": spatk, "spdef": spdef, "init": init };
}



async function initText(pokemon) {
    res = await fetch(pokemon["species"]["url"]);
    pokemonDesc = await res.json();
    pokemonDesc = pokemonDesc["flavor_text_entries"][8]["flavor_text"];
    return pokemonDesc;
}



function initDetails(pokemon) {
    pokemonName = pokemon["name"];
    pokemonType = pokemon["types"];
    pokemonImg = pokemon['sprites']['front_default'];
    let initTexts = [pokemonName, pokemonType, pokemonImg];
    return initTexts;
}


function initStats(pokemon) {
    // https://pokeapi.co/api/v2/pokemon/1+ 
    hp = pokemon["stats"][0]["base_stat"];
    atk = pokemon["stats"][1]["base_stat"];
    def = pokemon["stats"][2]["base_stat"];
    spatk = pokemon["stats"][3]["base_stat"];
    spdef = pokemon["stats"][4]["base_stat"];
    init = pokemon["stats"][5]["base_stat"];
    let initPokedex = [hp, atk, def, spatk, spdef, init];
    return initPokedex;

}


// load new selected Pokemon
function updatepokemon() {
    document.getElementById("Pokemon_img").src = pokedex[this.id]["img"];
    let typesDiv = document.getElementById("pokemon_types");
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]);
        getstats(pokedex[this.id]);
        typesDiv.append(type);
    }
    document.getElementById("pokemon_decription").innerText = pokedex[this.id]["desc"];
}


// print the stats from initStats()
function getstats(pokedex) {
    document.getElementById("hp").innerHTML = pokedex['hp'];
    document.getElementById("hp").style.width = pokedex['hp'] + "%";
    document.getElementById("atk").innerHTML = pokedex["atk"];
    document.getElementById("atk").style.width = pokedex['atk'] + "%";
    document.getElementById("def").innerHTML = pokedex["def"];
    document.getElementById("def").style.width = pokedex['def'] + "%";
    document.getElementById("spatk").innerHTML = pokedex["spatk"];
    document.getElementById("spatk").style.width = pokedex['spatk'] + "%";
    document.getElementById("spdef").innerHTML = pokedex["spdef"];
    document.getElementById("spdef").style.width = pokedex['spdef'] + "%";
    document.getElementById("init").innerHTML = pokedex["init"];
    document.getElementById("init").style.width = pokedex['init'] + "%";
}