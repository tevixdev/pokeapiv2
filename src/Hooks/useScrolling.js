import { useEffect, useContext, useRef } from 'react'

import { Context as PokemonContext } from 'Context/PokemonContext'
import { Context as ScrollingContext } from 'Context/ScrollingContext'

const useScrolling = () => {
     
  const { pokemons } = useContext(PokemonContext)
  const { scrollToElement, SetScrollToElement } = useContext(ScrollingContext)
  const cardRef = useRef()
 
  useEffect(() => {            
    const heightContainerCard = document.querySelector('.container-card')?.scrollHeight    
    const top = scrollToElement === 0 ? scrollToElement + 1 : scrollToElement || heightContainerCard    
    window.scrollTo({
      top: top,
      left: 0,
      behavior: 'smooth'
    })
    SetScrollToElement(false)
  }, [pokemons])

  useEffect(() => {
    
    const handleScroll = () => {      
      const scrollTop = document.documentElement.scrollTop      
      const limitScroll = 600
      const buttonScrollTop = document.querySelector('.button-scrollTop')

      if (scrollTop > limitScroll) {
        buttonScrollTop?.classList?.remove('hidden')
      } else {
        buttonScrollTop?.classList?.add('hidden')
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return {
    pokemons,
    cardRef,
    SetScrollToElement,
    scrollUp    
  }
}

export default useScrolling
