import React, {Component} from 'react';
import idbKeyval from 'idb-keyval';

import '../styles/css/App.css';

import GrudgeForm from './GrudgeForm';
import Grudge from './Grudge';
import OffenderList from './OffenderList';
import Counts from './Counts';

class App extends Component {
  constructor() {
    super();
    this.state = {
      grudges: [],
      offenders: [],
      selectedOffender: null,
      forgivenCount: null
    };
  }

  componentDidMount() {
    this.loadGrudgesFromStorage();
  }

  updateOffenders(newGrudgesArray) {
    let newOffendersArray = [];
    newGrudgesArray && newGrudgesArray.map((grudge) => {
      return (!newOffendersArray.includes(grudge.offender) && newOffendersArray.push(grudge.offender));
    });
    this.setState({offenders: newOffendersArray});
  }

  loadGrudgesFromStorage() {
    idbKeyval
      .get('grudges')
      .then(val => this.setState({grudges: val}))
      .then(() => this.updateOffenders(this.state.grudges))
      .then(() => console.log('grudges loaded'))
      .catch(err => console.log('An error occurred: ', err));
  }

  persistGrudges(newGrudgesArray) {
    idbKeyval
      .set('grudges', newGrudgesArray)
      .then(() => console.log('grudges set'))
      .catch(err => console.log('it failed!', err));
  }

  updateForgiven(updatedGrudge) {
    let grudges = this.state.grudges;
    let newGrudgesArray = grudges.map((grudge) => {
      if (grudge.key === updatedGrudge.key) {
        grudge.forgiven = !grudge.forgiven;
        return grudge;
      } else {
        return grudge;
      }
    });
    this.setState({grudges: newGrudgesArray});
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
    const grudges = this.state.grudges || [];
    const newGrudgesArray = grudges.concat(grudge);
    this.setState({grudges: newGrudgesArray});
    this.persistGrudges(newGrudgesArray);
    this.updateOffenders(newGrudgesArray);
  }

  deleteGrudge(grudgeToDelete) {
    const newGrudgesArray = this.state.grudges.filter(grudge => grudge !== grudgeToDelete);
    this.setState({grudges: newGrudgesArray});
    this.persistGrudges(newGrudgesArray);
    this.updateOffenders(newGrudgesArray);
  }

  countForgiven() {
    let count = 0;
    const grudges = this.state.grudges || [];
    grudges.map((grudge) => {
        return grudge.forgiven === true && count++;
      });
    return count;
  }

  render() {
    const {grudges, offenders, selectedOffender} = this.state;
    let grudgesToShow;
    if (grudges) { grudgesToShow = grudges.filter(grudge => grudge.offender === selectedOffender); }


    let totalOffenders; 
    if(offenders) {totalOffenders = offenders.length;}
    let totalGrudges;
    if(grudges) { totalGrudges = grudges.length;}
    
    let forgivenCount = this.countForgiven();
    
    let unforgivenCount = totalGrudges - forgivenCount;

    return (
      <section className='App'>
        <h1>Welcome to the Grudge Bin</h1>
        <Counts
          totalOffenders={totalOffenders}
          totalGrudges={totalGrudges}
          forgivenCount={forgivenCount}
          unforgivenCount={unforgivenCount}/>
        <GrudgeForm createGrudge={(e) => this.createGrudge(e)}/>
        <OffenderList
          offenders={offenders}
          updateOffender={(offender) => {
          this.setState({selectedOffender: offender})
        }}
          grudgesToShow={grudgesToShow}/>

        <section className='Grudges'>
          {grudgesToShow && grudgesToShow.map(grudge => <Grudge
            key={grudge.key}
            grudge={grudge}
            updateForgiven={(grudge) => this.updateForgiven(grudge)}
            deleteGrudge={(grudge) => this.deleteGrudge(grudge)}/>)
}
        </section>
      </section>
    );
  }
}

export default App;
