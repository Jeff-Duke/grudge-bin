import React from 'react';
import { Link } from 'react-router';

const OffenderList = ({ offenders, updateOffender, grudgesToShow }) => {
  return (
    <section>
      <h2> Those dastardly dogs what wronged you: </h2>
      <h4> Select a curr from the list to see what wongdoings they have done to ye</h4>
          <ul>
            {offenders && 
              offenders.map((offender, index) => 
              <li
              to={`${offender}`}
              key={index}
              onClick={() => updateOffender(offender)}
              >{offender}
              </li>)  
            }
          </ul>
    </section>
  );
};

export default OffenderList;