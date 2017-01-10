import React from 'react';

const GrudgeForm = ({createGrudge}) => {
  return (
    <article>
      <form className='GrudgeForm' 
        onSubmit={(e) => {
          e.preventDefault();
          createGrudge(e);
        }}>
        <label htmlFor='Offender' aria-label='Offender' title='Offender'>Offender: </label>
          <input id='Offender' type='text' name='Offender' placeholder='Offender'/>
        <label htmlFor='Offense' aria-label='Offense' title='Offense'>Offense: </label>
          <input
            id='Offense'
            type='textarea'
            rows='5'
            name='Offense'
            placeholder='Offense'/>
        <label htmlFor='GrudgeSubmitButton' aria-label='Grudge Submit Button' title='Submit'>
          <input
            className='GrudgeSubmitButton'
            type='submit'
          />
        </label>
      </form>
    </article>
  );
};

export default GrudgeForm;