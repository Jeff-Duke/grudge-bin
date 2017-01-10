import React from 'react';

const Grudge = (grudge, updateForgiven) => {
  const { title, offender, notes, forgiven } = grudge;
  return (
    <article className='grudge'>
      <p>{title}</p>
      <p>{offender}</p>
      <p>{notes}</p>
      <input 
        type='checkbox' 
        name='forgiven' 
        value={forgiven}
        onClick={(e) => {updateForgiven(e)}}
      />
    </article>
  );
};

export default Grudge;