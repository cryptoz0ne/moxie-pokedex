const apiEndpoint = 'https://pokeapi.co/api/v2/pokemon'

export const getPokemonList = () => {
  return new Promise((resolve, reject) => {
    fetch(`${apiEndpoint}?limit=12&offset=0`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export function getPokemon(pokemonName) {
  return new Promise((resolve, reject) => {
    fetch(`${apiEndpoint}/${pokemonName}`)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}