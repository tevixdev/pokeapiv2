import callApi from 'Services'

export const services = {
  getUrlPokemons({ limit = 5, offset = 0}){
    return callApi({url: `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`})
  },
  getPokemons({url}){
    return callApi({url})
  },
  getNextUrlPokemons({url}){
    return callApi({url})
  },
  getSinglePokemon({name}){
    return callApi({ url: `https://pokeapi.co/api/v2/pokemon/${name}` })
  },
  getItemLanguage({id, item, url}){
    return callApi({ url: url || `https://pokeapi.co/api/v2/${item}/${id}/` })
  }
}

export default services