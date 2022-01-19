import React from 'react'

import capitalizeFirstLetter from 'Utils/capitalizeFirstLetter'
import Loader from 'Components/Pogress'

const InformationPokemon = ({ 
  abilities,
  height,
  weight,
  isSpanish,
  language,
  abilitiesInDiffLanguage 
}) => {
  
  const titleAbilities = isSpanish ? 'Habilidades' : 'Abilities'
  const titleHeight = isSpanish ? 'Altura' : 'Height'
  const titleWeight = isSpanish ? 'Peso' : 'Weight'  

  if(!abilitiesInDiffLanguage[language]){
    return (      
      <Loader />      
    )
  }

  return (
    <div className='container-information'>
      <div className='container-information--item'>
        <span className='information'>{weight/10} kg</span>
        <span className='small'>{titleWeight}</span>
      </div>     
      <div className='container-information--item'>
        <span className='information'>{height/10} m</span>
        <span className='small'>{titleHeight}</span>
      </div>     
      <div className='container-information--item'>
        {abilities.map(({ ability: { name }}) => (
          <span 
            className='information'
            key={name}>              
            {abilitiesInDiffLanguage[language][name] && 
            capitalizeFirstLetter(abilitiesInDiffLanguage[language][name])}
          </span>
        ))}
        <span className='small'>{titleAbilities}</span>
      </div>     
    </div>
  )
}

export default InformationPokemon
