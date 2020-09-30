import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux'
import * as actions from './actions'

import Header from "./component/Header/header";
import Landing from './component/Landing/Landing'
import Dashboard from './component/Dashboard/Dashboard'
import SurveyNew from './component/SurveyNew/SurveyNew'

class App extends Component {

  componentDidMount(){
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">

        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  };

};

export default connect(null,actions)(App);
