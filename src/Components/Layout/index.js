import React from 'react'

import Header from './Header'
import Container from 'Components/Core/Container'

const Layout = ({children}) => {
  return (
    <>
      <Header/>
      <Container>
        {children}
      </Container>
    </>
                
  )
}

export default Layout
