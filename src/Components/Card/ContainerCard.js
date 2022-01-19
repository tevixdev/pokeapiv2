import React from 'react'

import useScrolling from 'Hooks/useScrolling'

import Card from './index'

const ContainerCard = () => {

  const { pokemons, scrollUp } = useScrolling()
  const classButton = 'container button-scrollTop hidden'

  const handleClick = () => {
    scrollUp()
  }


  return (
    <> 
      <main className='container-card'>
        {
          pokemons.map(({ id, name, sprites: { other: { dream_world} }}) => (
            <Card 
              img={dream_world?.front_default}
              key={id}
              name={name}              
            />          
          ))
        }
      </main>
      <button className={classButton} onClick={handleClick}>
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  )
}

export default ContainerCard
