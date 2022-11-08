import './App.css';
import { Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Countries from './components/Countries/Countries';
import CountryDetails from './components/CountryDetails/CountryDetails';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Activities from './components/Activities/Activities';

function App() {

  return (
    <div className="App">
      <Route path={'/countries'} component={Navigation} />
      <Route exact path={'/'} component={WelcomePage} />
      <Route exact path={'/countries'} component={Countries} />
      <Route
        exact
        path={'/countries/:idPais'}
        render={({ match }) => <CountryDetails id={match.params.idPais} />} />
      <Route exact path={'/activities'} component={Activities} />
    </div>
  );
}

export default App;
