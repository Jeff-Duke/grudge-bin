import React, { Component } from 'react';
import '../styles/css/App.css';

import Grudge from './Grudge';

class App extends Component {
  constructor() {
    super();
    this.state ={
      grudges: []
    };
  }

  componentDidMount() {
    this.loadGrudges();
  }

  loadGrudges() {
    console.log('loading some grudges');
  }

  updateForgive(e) {
    console.log('updating foriven', e);
  }

  render() {
    const {grudges} = this.state;
    return (
      <section className='App'>
        <h1>Welcome to the Grudge Bin</h1>
        <section className='Grudges'>
          { grudges &&
            grudges.map(grudge => <Grudge
              grudge={grudge}
              updateForgiven={(e) => this.updateForgiven(e)}
            />)
          }
        </section>
      </section>
    );
  }
}

export default App;
