import React, { useContext } from 'react'

import { Context as LanguageContext } from 'Context/LanguageContext'
import usePokemons from 'Hooks/usePokemons'
import useScrolling from 'Hooks/useScrolling'

import Progress from 'Components/Pogress'
import PageError from 'Pages/PageError'
import ContainerCard from 'Components/Card/ContainerCard'

import '../../Components/Layout/Header/styles.css'
import './styles.css'

const Home = () => {

  const { morePokemons, loading, loadingNextPokemons, error } = usePokemons()
  const { cardRef, SetScrollToElement } = useScrolling()
  const { isSpanish } = useContext(LanguageContext)
  const infoButton = isSpanish ? 'Cargar más' : 'Load more'

  const handleOnClick = () => {
    morePokemons()
    //SetScrollToElement(cardRef.current.getBoundingClientRect())
  }

  if (loading){
    return(
      <div className='flex'>
        <Progress/>        
      </div>
    )
  }
  
  if(error.error){
    return(
      <PageError/>
    )
  }

  return (
    <>
      <ContainerCard/>
      <div className='containerButton'>
        {loadingNextPokemons ?
          <div className='alignItem'>
            <Progress/> 
          </div> :
          <button className='button-loadMore' onClick={handleOnClick} ref={cardRef}>
            {infoButton}
          </button>}
      </div>
    </>
  )
}

export default Home
