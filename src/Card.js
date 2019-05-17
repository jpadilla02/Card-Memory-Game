import React from "react";

class Card extends React.Component {
  render() {
    return (
      <div
        className={
          "card " +
          (this.props.card.flipped ? " card--flipped" : "") +
          (!this.props.card.visible ? " card--hide" : "")
        }
        onClick={
          !this.props.card.flipped && this.props.card.visible
            ? () => this.props.handleClick(this.props.id)
            : null
        }
      >
        <div className="card--inner">
          <div className="card--front" />
          <div className="card--back">
            {this.props.card.flipped ? (
              <i className={"fa " + this.props.card.className} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
