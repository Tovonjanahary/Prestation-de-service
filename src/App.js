import "./App.css";
import { Route, Switch } from 'react-router-dom';
import ServiceList from './components/service-list.component';
import CreateService from "./components/create-service.component";
import EditService from "./components/edit-service.component";
import ServiceDetails from "./components/service-details.component";
import Details from "./page/services/Details.jsx";
import Service from "./page/services/Services.jsx";
import HomePage from "./page/Home.jsx";
import Inscription from "./page/services/Inscription.jsx";
import Signup from "./page/authentification/Signup";
import Signin from "./page/authentification/Signin";
import NotFound from "./page/NotFound.jsx";

function App() {
  return (
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/services/create">
          <CreateService />
        </Route>
        <Route path="/services/inscription/:id">
          <Inscription />
        </Route>
        <Route path="/user/signup">
          <Signup/>
        </Route>
        <Route path="/user/signin">
          <Signin/>
        </Route>
        <Route path="/services/dashboard">
          <ServiceList />
        </Route>
        <Route exact path="/details/:id">
          <Details />
        </Route>
        <Route exact path="/services/:id">
          <ServiceDetails />
        </Route>
        <Route exact path="/services/edit/:id">
          <EditService />
        </Route>
        <Route exact path="/services">
          <Service />
        </Route>
        <Route exact path="*">
          <NotFound />
        </Route>
      </Switch>
  );
}

export default App;
