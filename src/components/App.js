import React, { Component } from 'react';
import idbKeyval from 'idb-keyval';

import '../styles/css/App.css';


import GrudgeForm from './GrudgeForm';
import Grudge from './Grudge';
import OffenderList from './OffenderList';

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
    this.loadGrudgesFromStorage();
  }
  
  updateOffenders(newGrudgesArray) {
    let newOffendersArray = [];
    newGrudgesArray.map((grudge) => {
      return (!newOffendersArray.includes(grudge.offender) &&
        newOffendersArray.push(grudge.offender));
    });
   this.setState({ offenders: newOffendersArray});
  }

  loadGrudgesFromStorage() {
    idbKeyval.get('grudges')
      .then(val => this.setState({ grudges: val }))
      .then(() => this.updateOffenders(this.state.grudges))
      .then(() => console.log('grudges loaded'))
      .catch(err => console.log('An error occurred: ', err));
  }

  persistGrudges(newGrudgesArray) {
    idbKeyval.set('grudges', newGrudgesArray)
      .then(() => console.log('grudges set'))
      .catch(err => console.log('it failed!', err));
  }

  updateForgiven(updatedGrudge) {
    let grudges = this.state.grudges;
    let newGrudgesArray = grudges.map((grudge) => {
      if(grudge.key === updatedGrudge.key) {
        grudge.forgiven = !grudge.forgiven;
        return grudge;
      }
      else {
        return grudge;
      }
    });
    this.setState({ grudges: newGrudgesArray });
    this.persistGrudges(newGrudgesArray);
  }

  createGrudge(e) {
    const {Offender, Offense} = e.target;
    const grudge = {
      key: Date.now(),
      offender: Offender.value,
      offense: Offense.value,
      forgiven: false
    };
    const newGrudgesArray = this.state.grudges.concat(grudge);
    this.setState({ grudges: newGrudgesArray});
    this.persistGrudges(newGrudgesArray);
    this.updateOffenders(newGrudgesArray);
  }

  deleteGrudge(grudgeToDelete) {
    const newGrudgesArray = this.state.grudges.filter(grudge => grudge !== grudgeToDelete);
    this.setState({ grudges: newGrudgesArray});
    this.persistGrudges(newGrudgesArray);
    this.updateOffenders(newGrudgesArray);
  }

  render() {
    const {grudges, offenders, selectedOffender} = this.state;
    let grudgesToShow = grudges.filter(grudge => grudge.offender === selectedOffender);
    
    return (
      <section className='App'>
        <h1>Welcome to the Grudge Bin</h1>
        <section className='GrudgeFormContainer'>
          <GrudgeForm createGrudge={(e) => this.createGrudge(e)} />
        </section>
        
        <section className='OffenderListContainer'>
          <OffenderList
            offenders={offenders}
            updateOffender={(offender) => {this.setState({ selectedOffender: offender })}}
            grudgesToShow={grudgesToShow}
          />
        </section>

        <section className='Grudges'>
          { grudgesToShow &&
            grudgesToShow.map(grudge => <Grudge
              key={grudge.key}
              grudge={grudge}
              updateForgiven={(grudge) => this.updateForgiven(grudge)}
              deleteGrudge={(grudge) => this.deleteGrudge(grudge)}
            />)
          }
        </section>
      </section>
    );
  }
}

export default App;
