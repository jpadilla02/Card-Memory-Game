import React from "react";
import { Link } from "@reach/router";

const Winner = props => {
  return (
    <div className="winner">
      <h1>Winner Winner Chicken Dinner!!!!</h1>
      <Link className="reset-game" to="/">
        New Game
      </Link>
    </div>
  );
};

export default Winner;
