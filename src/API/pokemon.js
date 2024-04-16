export async function  getPokemonById(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getPokemonByName(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function get151Pokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function getImageUrl(id) {
    const threeDigitId = id.toString().padStart(3, '0');
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${threeDigitId}.png`;
}