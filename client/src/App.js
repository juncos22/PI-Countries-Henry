import './App.css';
import { Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Countries from './components/Countries/Countries';
import CountryDetails from './components/Countries/CountryDetails/CountryDetails';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Activities from './components/Activities/Activities';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <Route path={['/countries', '/activities']} component={Navigation} />
      <Route exact path={'/'} component={WelcomePage} />
      <Route exact path={'/countries'} component={Countries} />
      <Route
        exact
        path={'/countries/:idPais'}
        render={({ match }) => <CountryDetails id={match.params.idPais} />} />
      <Route exact path={'/activities'} component={Activities} />
    </React.Fragment>
  );
}

export default App;