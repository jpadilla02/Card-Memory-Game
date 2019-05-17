import React from "react";
import { Link } from "@reach/router";

class Home extends React.Component {
  state = {
    difficulty: ""
  };

  handleRadioChoice = changeEvent => {
    this.setState({ difficulty: changeEvent.target.value });
  };

  render() {
    return (
      <div className="home">
        <div className="container">
          <div className="home__title">
            <h1>Card Memory Game </h1>
          </div>

          <div className="home__game">
            <h4>Pick difficulty:</h4>
            <ul className="home__game--difficulty">
              <li>
                <input
                  type="radio"
                  name="difficulty"
                  id="easy"
                  value="easy"
                  onChange={this.handleRadioChoice}
                />
                <label htmlFor="easy">Easy</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="difficulty"
                  id="intermediate"
                  value="intermediate"
                  onChange={this.handleRadioChoice}
                />
                <label htmlFor="intermediate">Intermediate</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="difficulty"
                  id="hard"
                  value="hard"
                  onChange={this.handleRadioChoice}
                />
                <label htmlFor="hard">Hard</label>
              </li>
            </ul>
            <Link to={`/game/${this.state.difficulty}`}> Start Game </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
