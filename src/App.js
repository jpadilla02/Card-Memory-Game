import React from "react";
import { Router } from "@reach/router";
import Game from "./Game";
import Home from "./Home";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Home path="/" />
        <Game path="/game/:difficulty" />
      </Router>
    );
  }
}

export default App;
