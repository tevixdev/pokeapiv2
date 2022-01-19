import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';

import LanguageContext from 'Context/LanguageContext';
import PokemonContext from 'Context/PokemonContext'
import ScrollingContext from 'Context/ScrollingContext';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <LanguageContext.Provider>
      <PokemonContext.Provider>
        <ScrollingContext.Provider>
          <Routes />
        </ScrollingContext.Provider>
      </PokemonContext.Provider>
    </LanguageContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
