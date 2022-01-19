import React, { useContext, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import { Context as LanguageContext } from 'Context/LanguageContext'

import usePokemons from 'Hooks/usePokemons'
import { colors, colorsBackgroundBar } from './constants'

import { HOME } from 'Constants/routes'
import '../styles.css'
import Loader from 'Components/Pogress'
import InformationPokemon from './InformationPokemon'
import Stats from './Stats'
import StatsHeader from './StatsHeader'

const Detail = () => {
 
  const { 
    statsInDiffLanguage, 
    abilitiesInDiffLanguage,
    language, 
    loadingStats,
    isSpanish,
    setUrlsAbilities
  } = useContext(LanguageContext)

  const location = useLocation()
  const history = useHistory()
  const { pokemons, loading, singlePokemon } = usePokemons()
  let pokemon
  let urls = []

  const superCondition = loading
    || (!Object.keys(singlePokemon).length && !pokemons.length)
    || loadingStats
  
  const goBack = () => {
    history.push(HOME)
  }

  if (!(superCondition)){
    pokemon = pokemons.length
      ? pokemons.find(({ name }) => {
        return location.pathname.includes(name)
      })
      : singlePokemon
      
    pokemon.abilities.map(({ ability: { url } }) => (
      urls.push(url)
    ))
  }
    
  useEffect(() => {    
    urls && setUrlsAbilities(urls)
  }, [ pokemon]);
    
  if (superCondition){
    return(
      <div className='flex'>
        <Loader/>
      </div>
    )
  }

  const type = pokemon?.types[0]?.type?.name || 'normal'
  const cardDetail = { borderColor: colors[type], backgroundColor: colors[type] }

  return (
    <> 
      <button 
        className='button-back'
        onClick={goBack}
        style={{backgroundColor: colors[type]}}>
        <i className="fas fa-arrow-left"></i>
      </button>
      <div className='flex'>
        <div
          className={'card-detail'} 
          style={cardDetail}>
          <div className='container-img'>
            <img
              alt={pokemon.name}
              className='img-pokemon-detail'
              src={pokemon.sprites.other.dream_world.front_default}
            />
          </div>
          <div className='container-detail'>
            <div className='container-types'>
              {pokemon?.types.map(({type: {name: type}}) => (
                <p 
                  className={'type'} 
                  key={type}
                  style={{ backgroundColor: colors[type]}}>
                  {type}
                </p>
              ) )}
            </div>
            <InformationPokemon 
              abilities={pokemon?.abilities}
              abilitiesInDiffLanguage={abilitiesInDiffLanguage}
              height={pokemon?.height}
              isSpanish={isSpanish}
              language={language}
              weight={pokemon?.weight}
            />
      
            <StatsHeader>
              {pokemon.stats.map(({stat: {name}, base_stat}) => (
                (base_stat && name) &&
               <Stats
                 baseStat={base_stat}
                 colorBackgroundBar={colorsBackgroundBar[type]}
                 colorBar={colors[type]}
                 key={name}
                 language={language}
                 statName={name}
                 statsInDiffLanguage={statsInDiffLanguage}
               />
              ))}
            </StatsHeader>
          </div>
        </div>
      </div> 
    </>
  ) 
}

export default Detail
