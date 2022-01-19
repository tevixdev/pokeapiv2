import React from 'react'

import pikachuSad from 'Assets/Img/pikachu-sad.png'

import './styles.css'

const PageError = () => {
  return (
    <div className='container-notFound'>
      <h1 className='title-notFound'>Page Not Found</h1>      
      <img alt='Not Found' className='img-notFound' src={pikachuSad}/>
    </div>
  )
}

export default PageError
