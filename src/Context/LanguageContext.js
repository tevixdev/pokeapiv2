import React, { createContext, useState, useEffect } from 'react'

import services from 'Services/pokemons-services'

export const Context = createContext()

const initialState = localStorage.getItem('language') || 'spanish'

const Provider = ({ children }) => {
    
  const [language, setLanguage] = useState(initialState)
  const [statsInDiffLanguage, setStatsInDiffLanguage] = useState({}) 
  const [abilitiesInDiffLanguage, setabilitiesInDiffLanguage  ] = useState({})
  const [urlsAbilities, setUrlsAbilities] = useState([]);  
  const [loadingStats, setLoadingStats] = useState(false)
  const [loadingAbilities, setLoadingAbilities] = useState(false)
  const isSpanish = language === 'spanish'

  const transformKey = ({text}) => (
    text.replaceAll(' ', '-').toLowerCase()
  )

  useEffect(() => {
    try{
      const statsInSpanish = []
      const statsInEnglish = []
      const getDataInDiffLanguages  = async () => {
        setLoadingStats(true)
        let limit = 8  
        for (let i = 1; i <= limit; i++){
          const data = await services.getItemLanguage({id: i, item: 'stat'})
          data.names.map(({language, name}) => {
            language.name === 'es' && statsInSpanish.push([transformKey({ text: data.name}), name])
            language.name === 'en' && statsInEnglish.push([transformKey({ text: name }), name])
          })
        }    
        setStatsInDiffLanguage({
          english: Object.fromEntries(statsInEnglish),
          spanish: Object.fromEntries(statsInSpanish)
        })
        setLoadingStats(false)    
      }
      !Object.keys(statsInDiffLanguage).length && getDataInDiffLanguages()
      
    }catch(err){
      setLoadingStats(false)
      console.log(err)
    }
     
  }, [])

  const changeLanguage = ({languageValue}) => {
    setLanguage(languageValue)
    localStorage.setItem('language', languageValue)
  }

  useEffect(() => {
    try{      
      const getLanguageAbilitie = async () => {
        setLoadingAbilities(true)   
        const abilitiesInSpanish = []
        const abilitiesInEnglish = []        
        if (urlsAbilities.length){
          for (let i = 1; i <= urlsAbilities.length; i++) {
            console.log('asdasdadsasd', urlsAbilities[i - 1]);
            const data = await services.getItemLanguage({ url: urlsAbilities[i-1] })
            console.log(data);
            data.names.map(({ language, name }) => {
              language.name === 'es' && abilitiesInSpanish.push([transformKey({ text: data.name }), name])
              language.name === 'en' && abilitiesInEnglish.push([transformKey({ text: name }), name])
            })
            
            setabilitiesInDiffLanguage({
              spanish: Object.fromEntries(abilitiesInSpanish),
              english: Object.fromEntries(abilitiesInEnglish)
            })                
          }
        }
        setLoadingAbilities(false)                 
      }
      urlsAbilities.length && getLanguageAbilitie()
    }catch(err){
      setLoadingAbilities(false)
      console.log('ERROR', err);
    }
  
  }, [urlsAbilities]);
  
  

  const value = {
    language,
    isSpanish,
    loadingStats,
    loadingAbilities,
    statsInDiffLanguage,
    abilitiesInDiffLanguage,
    setUrlsAbilities,
    changeLanguage
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default {
  Provider,
  Context: Context.Consumer
}
