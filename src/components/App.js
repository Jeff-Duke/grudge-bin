import React, { Component } from 'react';
import '../styles/css/App.css';

import GrudgeForm from './GrudgeForm';
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
    console.log('loading some grudges', this.state.grudges);
  }

  updateForgiven(e) {
    console.log('updating foriven', e);
  }

  createGrudge(e) {
    const {Offender, Offense} = e.target;
    const grudge = {
      key: Date.now(),
      offender: Offender.value,
      offense: Offense.value,
      forgiven: false
    };

    this.setState({ grudges: this.state.grudges.concat(grudge)});
  }

  render() {
    const {grudges} = this.state;
    return (
      <section className='App'>
        <h1>Welcome to the Grudge Bin</h1>
        <section className='GrudgeFormContainer'>
          <GrudgeForm createGrudge={(e) => this.createGrudge(e)} />
        </section>
        <section className='Grudges'>
          { grudges &&
            grudges.map(grudge => <Grudge
              key={grudge.key}
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
