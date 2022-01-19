import React from 'react'

import './stats.css'
import capitalizeFirstLetter from 'Utils/capitalizeFirstLetter'

const Stats = ({ 
  baseStat,
  statName,
  colorBackgroundBar,
  colorBar,
  statsInDiffLanguage,
  language 
}) => {  
  const baseStatRound = Math.round(baseStat / 2)
  
  return (
    <section className='stats'>
      <div className='stats__item'>
        <p className='stats__title' style={{ color: colorBar }}>
          {capitalizeFirstLetter(statsInDiffLanguage[language][statName])}
        </p>
        {baseStat &&
            <div
              className={`stats__bar stats__bar--${baseStatRound}`} 
              style={{ backgroundColor: colorBackgroundBar, '--color-bar': colorBar}}
            />}
      </div>
    </section>
  )
}

export default Stats
