import React, { Component } from 'react';
import idbKeyval from 'idb-keyval';

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


  persistGrudges(newGrudgesArray) {
    idbKeyval.set('grudges', newGrudgesArray)
      .then(() => console.log('grudges set'))
      .catch(err => console.log('it failed!', err));
  }

  loadOffenders() {
    const { grudges } = this.state;
    const newOffendersArray = [];
    grudges.map((grudge) => { return newOffendersArray.push(grudge.offender); });
    this.setState({ offenders: newOffendersArray });
  }

  loadGrudges() {
    idbKeyval.get('grudges')
      .then(val => this.setState({ grudges: val }))
      .then(() => this.loadOffenders())
      .then(() => console.log('grudges loaded'))
      .catch(err => console.log('An error occurred: ', err));
  }

  updateGrudges(grudge) {
    const newGrudgesArray = this.state.grudges.concat(grudge);
    this.setState({ grudges: newGrudgesArray});
    this.persistGrudges(newGrudgesArray);
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
    this.updateGrudges(grudge);
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
