import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import user from './components/User.js'
import cop from './components/Cop.js'
import AddCop from './components/AddCop'
import Home from './components/Home'
import HeaderNav from './components/HeaderNav'
  
function App() {
  return (
    <div className="App">
      <HeaderNav />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/cop' component={cop}/>
          <Route path='/user' component={user}/>
          <Route path='/addcop' component={AddCop}/>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
