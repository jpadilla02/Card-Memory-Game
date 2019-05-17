import React from "react";
import { Link } from "@reach/router";

const GameOver = () => {
  return (
    <div className="gameOver">
      <h1>Better Luck Next Time!</h1>
      <Link className="reset-game" to="/">
        New Game
      </Link>
    </div>
  );
};

export default GameOver;
