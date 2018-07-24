import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {

  render() {
    return (
        <button className="square" onClick = {() =>
          this.props.ClickHandler()}>
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
      bool: true
    }
  }
  ClickFunc(i)  {
      const {array, bool} = this.state;
      let element = [...array];

      if(Winner(array)) {
        console.log(Winner(array))
        return;
      }
      else if(element[i] == null && bool) {
          element[i] = "x";
      }
      else if(element[i] == null && !bool) {
          element[i] = "o";
      }

      this.setState({
          array: element,
          bool: !bool
      })
  }

  renderSquare(i) {
    return (
      <Square
        squareNumber = {this.state.array[i]}
        ClickHandler = {() => this.ClickFunc(i)}
      />
    )
  }

  render() {
    const {array, bool} = this.state;
    let end = "No winner yet";
    const winner = Winner(array)
    if(winner === "no one") {
      end = `The winner is ${winner}`
      alert(end)
    }
    else if(winner) {
      end = `The winner is ${winner}`
      alert(end)
    }

    const status = 'Next player: ' + (bool ? 'x' : 'O');
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

function Winner(array) {
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
