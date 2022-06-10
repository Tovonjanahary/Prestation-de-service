import "./App.css";
import { Route, Switch } from 'react-router-dom';
import Details from "./page/services/Details.jsx";
import Service from "./page/services/Services.jsx";
import HomePage from "./page/Home.jsx";
import Inscription from "./page/services/Inscription.jsx";
import Signup from "./page/authentification/Signup";
import Signin from "./page/authentification/Signin";
import NotFound from "./page/NotFound.jsx";
import UserProfile from "./page/services/UserProfile.jsx";

function App() {
  return (
      <Switch>
        <Route exact path="/">
          <HomePage />
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
        <Route path="/user/profile/:userid">
          <UserProfile/>
        </Route>
        <Route exact path="/details/:id">
          <Details />
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
