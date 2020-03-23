import React, { Component } from 'react';
import Main from './Main';
import bisection from './menu/bisection';
import falsemethod from './menu/falsemethod';
import newton from './menu/Newton';
import onepoint from './menu/onepoint';
import secant from './menu/secantmethod';
import InterQ from './menu/InterpolationQ';
import {Router,Route,Link,browserHistory} from 'react-router';
import './css/bootstrap.css';
import './css/templatemo-style.css';




class App extends Component{

  render() {

      return (
        <div>
        <Router history={browserHistory}>
          <Route path="/" component={Main}/>
          <Route path="/bisection" component={bisection}/>
          <Route path="/falsemethod" component={falsemethod}/>
          <Route path="/newton" component={newton}  />
          <Route path="/onepoint" component={onepoint}/>
          <Route path="/secant" component={secant}/>
          <Route path="/InterpolationQuadraNDD" component={InterQ}/>
        </Router>     
        </div>  
        
      );
    }

}



export default App;
