import React from 'react'
import { useHistory } from 'react-router-dom'

import useScrolling from 'Hooks/useScrolling'
import './styles.css'



const Card = ({ name, img}) => {

  const { cardRef, SetScrollToElement } = useScrolling()
  const history = useHistory()

  const handleOnClick = () => {    
    const positionScroll = document.documentElement.scrollTop
    SetScrollToElement(positionScroll)
    history.push(`/detail/${name}`)
  }

  return (
    <div className='card' onClick={handleOnClick} ref={cardRef}>
      <div className='container-picture'>
        <picture>
          <img className='img-card' src={img}/>
        </picture>
      </div>
      <div className='namePokemon-card'>{name}</div>
    </div>

  )
}

export default Card
