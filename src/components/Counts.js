import React from 'react';

const Counts = ({totalOffenders, totalGrudges, forgivenCount, unforgivenCount}) => {
  return (
    <article className='Counts'>
      <p>Grudges Forgiven: <span className='Count'>{forgivenCount}</span></p>
      <p>Grudges not yet forgiven: <span className='Count'>{unforgivenCount}</span></p>
      <p>All your grudges: <span className='Count'>{totalGrudges}</span></p>
      <p>People that wronged you: <span className='Count'>{totalOffenders}</span></p>
    </article>
  );
};

export default Counts;