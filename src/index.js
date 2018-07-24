import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {

  render() {
    return (
        <button className="square" onClick = {() =>
          this.props.clickHandler()}>
        {this.props.squareNumber}

        </button>
    );
  }
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        squareNumber = {this.props.squares[i]}
        clickHandler = {() => this.props.turnCheck(i)}
      />
    )
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
class Player extends React.Component {
  static FIRST_PLAYER = 'x';
  static SECOND_PLAYER = "o"
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      turn: true,
      winner: null
    }
  }

  playerDetect() {

          if(this.state.turn) {
            return Player.FIRST_PLAYER;
          }
          else {
            return Player.SECOND_PLAYER;
          }

        }
  turnCheck(i)  {

      const {squares, turn, winner} = this.state;
      let element = [...squares];
      console.log(winner)
      if(element[i] !== null || winner) {
        return;
      }

      element[i] = this.playerDetect();

      this.setState({
          squares: element,
          turn: !turn
      })
      this.winnerDetect(element);
  }
  winnerDetect(squares) {
    const {swinner} = this.state;

    const currentWinner = winnerCheck(squares)

    if(currentWinner) {
      this.setState({
          winner: currentWinner
      })
    }

  }

  render() {

    const {winner} = this.state;
    let status;
    if (winner) {
     status = 'Winner: ' + winner;
    } else {
     status = `Next Player: ${this.playerDetect()}`;
    }

    return (

      <div className="game">
      <div className="status">{status}</div>
        <div className="game-board">
          <Board
            squares={this.state.squares}
            turnCheck={(i) => this.turnCheck(i)}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function winnerCheck(squares) {
  const possibility = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < possibility.length; i++) {
    const [x,y,z] = possibility[i];
    if (squares[x] && squares[x] === squares[y] && squares[y] === squares[z]) {
      return squares[x];
    }
  }
  if(!squares.includes(null)) {
    return "no one";
  }
  return null;
}
