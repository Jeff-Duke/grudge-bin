import React from 'react';

const Grudge = ({grudge, updateForgiven}) => {
  const { offender, offense, forgiven, key } = grudge;
  return (
    <article className='grudge' key={key}>
      <h3>{offender}</h3>
      <p>{offense}</p>
      <label htmlFor='forgiven'>Forgiven</label>
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