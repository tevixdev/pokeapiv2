import React from 'react';

import './stats.css'

const StatsHeader = ({children}) => {
  return ( 
    <section>
      <div className='stats__header'>
        <small>min</small>
        <small>max</small>
      </div>
      <span className='stats__header'>
        <small>0</small>
        <small>200</small>
      </span>
      {children}
    </section>
  )
};

export default StatsHeader;
