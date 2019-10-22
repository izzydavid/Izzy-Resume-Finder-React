import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header"
import Main from "./components/pages/Main/Main";
import Register from "./components/pages/Register/Register"
import Login from "./components/pages/Login/Login"
import Welcome from "./components/pages/Welcome/Welcome"
import Footer from "./components/Footer"



class App extends Component {

  render() {
    return (
      <Router>
        <div className="filler">
          <div className="filler">
            <Header />
            <Route path="/main" component={Main} />
            <Route exact path="/" component={Welcome} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;


