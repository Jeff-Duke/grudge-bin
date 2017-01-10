import React, { Component } from 'react';
import '../styles/css/App.css';

import GrudgeForm from './GrudgeForm';
import Grudge from './Grudge';

class App extends Component {
  constructor() {
    super();
    this.state ={
      grudges: [],
      offenders: [],
      selectedOffender: null
    };
  }

  componentDidMount() {
    this.loadGrudges();
  }

  persistGrudges() {
    console.log('saving grudges somewhere locally', this.state.grudges);
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
    this.persistGrudges();
    this.updateOffenders(grudge);
  }

  updateOffenders(grudge) {
    const offenders = this.state.offenders;
    let offender = grudge.offender;
    if (!offenders.includes(offender)) {
      let newOffendersArray = this.state.offenders.concat(offender).sort();
      this.setState({ offenders: newOffendersArray });      
    }
  }

  render() {
    const {grudges, offenders} = this.state;
    
    return (
      <section className='App'>
        <h1>Welcome to the Grudge Bin</h1>
        <section className='GrudgeFormContainer'>
          <GrudgeForm createGrudge={(e) => this.createGrudge(e)} />
        </section>
        <section>
          <ul>
            {offenders && 
              offenders.map((offender, index) => <li key={index}>Offenders!!!  {offender}</li>)  
            }
          </ul>
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
