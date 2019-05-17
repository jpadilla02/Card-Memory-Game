import React from "react";
import { cardSet } from "./lib/cards";
import Card from "./Card";
import Winner from "./Winner";
import GameOver from "./GameOver";
import "./fonts/font-awesome/css/font-awesome.min.css";
import "./scss/app.scss";

let timerInterval = "";
class Game extends React.Component {
  state = {
    cards: [],
    clicks: 1,
    pickedCards: [],
    remaining: 12,
    winner: false,
    gameOver: false,
    timer: ""
  };

  startTimer = (duration, display, line) => {
    let timer = duration,
      minutes,
      seconds;

    let lineInitialWidth = line.style.width.replace("%", "");
    const widthReduce = lineInitialWidth / duration;
    timerInterval = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : seconds;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;
      --timer;
      this.setState({ timer });

      if (timer < 0) {
        clearInterval(timerInterval);
      }

      if (timer < 0 && this.state.remaining > 2) {
        this.setState({ gameOver: true });
      }
      lineInitialWidth -= widthReduce;
      line.style.width = lineInitialWidth + "%";
    }, 1000);
  };

  checkWinner = () => {
    if (this.state.timer !== 0 && this.state.remaining - 2 === 0) {
      clearInterval(timerInterval);
      this.setState({ winner: true });
    }
  };

  reset = () => {
    const cards__copy = [...this.state.cards];
    cards__copy.forEach(card => {
      card.flipped = false;
    });
    this.setState({ cards: cards__copy, clicks: 1, pickedCards: [] });
  };

  handleCardClick = id => {
    this.setState({ clicks: this.state.clicks + 1 });
    const cards__copy = [...this.state.cards];
    const pickedCards = [...this.state.pickedCards];
    const flipped__card = cards__copy.find(card => card.id === id);

    if (this.state.clicks < 3) {
      pickedCards.push(flipped__card);
      flipped__card.flipped = true;
      this.setState({ cards: cards__copy, pickedCards });
    }

    if (this.state.clicks === 2) {
      this.checkMatch(pickedCards);
      this.checkWinner();
    }
  };

  checkMatch = array => {
    const cards__copy = [...this.state.cards];
    const pickedCard1 = cards__copy.find(card => card.id === array[0].id);
    const pickedCard2 = cards__copy.find(card => card.id === array[1].id);
    if (array[0].code === array[1].code) {
      setTimeout(() => {
        pickedCard1.visible = false;
        pickedCard2.visible = false;
        this.setState({
          cards: cards__copy,
          clicks: 1,
          pickedCards: [],
          remaining: this.state.remaining - 2
        });
      }, 800);
    } else {
      setTimeout(() => {
        this.reset();
      }, 800);
    }
  };

  shuffleCards = array => {
    array.sort(() => Math.random() - 0.5);
    return array;
  };

  resetCards = () => {
    cardSet.forEach(card => {
      card.visible = true;
      card.flipped = false;
    });
  };

  componentDidMount() {
    const timer =
      this.props.difficulty === "easy"
        ? 300
        : this.props.difficulty === "intermediate"
        ? 200
        : 100;
    const time = document.querySelector(".time");
    const timeLine = document.querySelector(".cardy__timer span");
    this.resetCards();
    this.setState({ timer, cards: this.shuffleCards(cardSet) });
    this.startTimer(timer, time, timeLine);
  }

  render() {
    return (
      <div className="cardy">
        <div className="container">
          {!this.state.winner && !this.state.gameOver ? (
            <React.Fragment>
              <div className="cardy__timer">
                <span style={{ width: 100 + "%" }} />
                <span className="time" />
              </div>
              <div className="cards">
                {this.state.cards.map((card, index) => (
                  <Card
                    key={index}
                    id={card.id}
                    card={card}
                    reset={this.reset}
                    handleClick={this.handleCardClick}
                    flipped={this.state.flipped}
                  />
                ))}
              </div>
            </React.Fragment>
          ) : this.state.winner ? (
            <Winner />
          ) : (
            <GameOver />
          )}
        </div>
      </div>
    );
  }
}

export default Game;
