import React, { createContext, useState } from 'react'

export const Context = createContext()

const initialStatePagination = {
  nextPage: null,
  prevPage: null,
  count: 0,
  page: 1
}

const Provider = ({ children }) => {  
  const [pokemons, setPokemons] = useState([])
  const [singlePokemon, setSinglePokemon] = useState({})
  const [pagination, setPagination] = useState(initialStatePagination)

  const value = {
    pokemons,
    pagination,
    singlePokemon,
    setPagination,
    setPokemons,
    setSinglePokemon
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default {
  Provider,
  Context: Context.Consumer
}
