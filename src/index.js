import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match } from 'react-router';

import '../src/styles/css/index.css';

import App from '../src/components/App';


const Root = () => {
  return (
    <BrowserRouter>
      <section>
        <Match exactly pattern="/" component={ App } />
      </section>
    </BrowserRouter>
  )
}

render(<Root />, document.getElementById('root'));