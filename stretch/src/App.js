import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import './App.css';

import Register from './auth/Register';
import Login from './auth/Login';
import Jokes from './jokes/Jokes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <NavLink to="/register"><ButtonNav>Register</ButtonNav></NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/login"><ButtonNav>LogIn</ButtonNav></NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/jokes"><ButtonNav>Jokes</ButtonNav></NavLink>
      </header>
      <main>
      <Route path="/register" component={Register}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/jokes" component={Jokes}></Route>
      </main>
    </div>
  );
}

export default App;
