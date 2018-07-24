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
  constructor() {
    super();
    this.state = {
      array: Array(9).fill(null),
      turn: true
    }
  }
  turnCheck(i)  {
      const {array, turn} = this.state;
      let element = [...array];
      if(element[i] !== null) {
        return;
      }
      if(winnerCheck(array)) {
        console.log(winnerCheck(array))
        return;
      }
      else if(turn) {
          element[i] = "x";
      }
      else if(!turn) {
          element[i] = "o";
      }

      this.setState({
          array: element,
          turn: !turn
      })
  }

  renderSquare(i) {
    return (
      <Square
        squareNumber = {this.state.array[i]}
        clickHandler = {() => this.turnCheck(i)}
      />
    )
  }

  render() {
    const {array, turn} = this.state;
    let end = "No winner yet";
    const winner = winnerCheck(array)
    if(winner === "no one") {
      end = `The winner is ${winner}`

    }
    else if(winner) {
      end = `The winner is ${winner}`

    }
    let status;
    if (winner || winner === "no one") {
     status = 'Winner: ' + winner;
    } else {
     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>


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

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
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

function winnerCheck(array) {
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
    if (array[x] && array[x] === array[y] && array[y] === array[z]) {
      return array[x];
    }
  }
  if(!array.includes(null)) {
    return "no one";
  }
  return null;
}
