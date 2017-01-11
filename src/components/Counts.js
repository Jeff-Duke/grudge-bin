import React from 'react';

const Counts = ({totalOffenders, totalGrudges, forgivenCount, unforgivenCount}) => {
  return (
    <article className='Counts'>
      <p>Grudges Forgiven: {forgivenCount}</p>
      <p>Grudges not yet forgiven: {unforgivenCount}</p>
      <p>All your grudges: {totalGrudges}</p>
      <p>People that wronged you: {totalOffenders}</p>
    </article>
  );
};

export default Counts;