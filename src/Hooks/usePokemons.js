import { useState, useEffect, useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { Context as PokemonContext } from 'Context/PokemonContext'
import  services from 'Services/pokemons-services'
import { HOME } from 'Constants/routes'

const initialStateError = {
  msg: '',
  error: false
}

const usePokemons = () => {
  const {
    pokemons,
    singlePokemon,
    pagination, 
    setPokemons, 
    setPagination,
    setSinglePokemon
  } = useContext(PokemonContext)
  const [ loading, setLoading ] = useState(false)
  const [loadingNextPokemons, setLoadingNextPokemons ] = useState(false)
  const [error, setError] = useState(initialStateError)
  const location = useLocation()
  const params = useParams()
  
  const setPaginationAndPokemons = ({ previous, next, count, results }) => {
    setPagination({
      ...pagination,
      nextPage: next,
      prevPage: previous,
      count
    })
    results.map(async ({ url }) => {
      try {
        const data = await services.getPokemons({ url })
        setPokemons(prev => prev.concat(data))        
      }catch (err) {
        setError({ msg: err, error: true })
        setLoading(false)
      }
    })
  }
  
  useEffect(() => {
    
    try {      

      const getUrlPokemons = async () => {
        setLoading(true)
        try{
          const { results, previous, next, count } = await services.getUrlPokemons({ limit: 5, offset: 0 })
          setLoading(false)                    
          setPaginationAndPokemons({ previous, next, count, results })
        }catch(err){
          setError({msg: err, error: true})
          setLoading(false)
        }
      }

      const getSinglePokemon = async () => {
        try{    
          setLoading(true)          
          const data = await services.getSinglePokemon({ name: params.name })
          setSinglePokemon(data)  
          setLoading(false)
        }catch(err){
          console.log('error', err)
          setError({ msg: err, error: true })
          setLoading(false)
        }
      }

      if(location.pathname.includes(HOME)){
        (pagination?.page === 1 && !pokemons.length) &&
        getUrlPokemons() 
      }

      if (location.pathname.includes('/detail/')){        
        !pokemons.length && getSinglePokemon()
      }

    } catch (err) {            
      setError({ msg: err, error: true })
      setLoading(false)
    }
  }, [pagination.page])

  const getNextUrlPokemons = async () => {
    try {
      setLoadingNextPokemons(true)
      const {
        results,
        previous,
        next,
        count
      } = await services.getNextUrlPokemons({ url: pagination.nextPage })
      setLoadingNextPokemons(false)
      setPaginationAndPokemons({ previous, next, count, results })
    } catch (err) {
      setError({ msg: err, error: true })
      setLoadingNextPokemons(false)
    }
  }


  const morePokemons = () => {
    getNextUrlPokemons()
  }

  return {
    pokemons,
    pagination, 
    setPokemons,
    singlePokemon,
    morePokemons,
    loading,
    loadingNextPokemons,
    error
  }
}

export default usePokemons
