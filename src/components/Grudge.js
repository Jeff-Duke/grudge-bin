import React from 'react';

const Grudge = ({grudge, updateForgiven, deleteGrudge}) => {
  const {offender, offense, forgiven, key} = grudge;
  return (
    <article className='grudge' key={key}>
      <h3>{offender}</h3>
      <p>{offense}</p>
      <label htmlFor='forgiven'>Forgiven</label>
      <input
        type='checkbox'
        name='forgiven'
        defaultChecked={forgiven}
        onClick={() => {
        updateForgiven(grudge)
      }}/>
      <button
        name='deleteGrudge'
        aria-label='Delete Grudge Button'
        children='X'
        onClick={(e) => {
          e.preventDefault();
          deleteGrudge(grudge);
        }}>
      </button>
    </article>
  );
};

export default Grudge;