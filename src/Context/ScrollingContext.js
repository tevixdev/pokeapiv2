import React, { createContext, useState } from 'react'


export const Context = createContext()

const Provider = ({ children }) => {

  const [scrollToElement, SetScrollToElement] = useState()

  const value = {
    scrollToElement,
    SetScrollToElement
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default {
  Provider,
  Context: Context.Consumer
}
