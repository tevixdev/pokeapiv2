import React, { useContext, useRef } from 'react'

import { Context as LanguageContext } from 'Context/LanguageContext'
import unitedFlag from 'Assets/Img/united_flag.ico'
import spainFlag from 'Assets/Img/spain_flag.ico'
import titleSvg from 'Assets/Img/pokemon-title.png'
import './styles.css'

const Header = () => {
  const { changeLanguage, language, isSpanish } = useContext(LanguageContext)  
  const langSecondaryRef = useRef()

  const handleChangeLanguage = ({language}) => {
    console.log(language);
    changeLanguage({ languageValue: language})
    langSecondaryRef.current.classList.toggle('visibility')  
  }
  const handleClick = () => {    
    langSecondaryRef.current.classList.toggle('visibility')    
  }

  const langSecond = isSpanish ? 'english' : 'spanish'

  const languageToDisplay = {
    spanish: {
      flagPrimary: spainFlag,
      flagSecondary: unitedFlag,
      textPrimary: 'Español',
      textSecondary: 'Inglés'
    },
    english: {
      flagPrimary: unitedFlag,
      flagSecondary: spainFlag,
      textPrimary: 'English',
      textSecondary: 'Spanish'
    }
  }

  console.log(language);
  return (
    <div className='header'>
      <img alt='pokemon' className='img-title' src={titleSvg}/>
      <div className='container-language'>
        <div className='language-primary' onClick={handleClick}>
          <img alt='flag' className='img-header' src={languageToDisplay[language].flagPrimary}/>  
          <p>{languageToDisplay[language].textPrimary}</p>        
        </div>
        <div 
          className={'language-secondary'}
          onClick={() => handleChangeLanguage({ language: langSecond})}
          ref={langSecondaryRef}>
          <img alt='flag' className='img-header' src={languageToDisplay[language].flagSecondary} />
          <div>{languageToDisplay[language].textSecondary}</div>          
        </div>
      </div>
    </div>
  )
}

export default Header
