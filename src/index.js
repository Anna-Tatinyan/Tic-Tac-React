import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {

  constructor(props) {
    debugger;
    super();

    this.state = {
      squareText: props.squareNumber
    }
  }
  render() {
    return (
      <button className="square" onClick = {() => {
        const check = PlayerCheck(this.props.squareNumber);
          this.setState({squareText: check})
        }
      }>
      {this.state.squareText}
        {/* TODO */}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      char: 5
    }
  }
  handleClick() {
    this.setState({
      char: !this.state.char,

    });
 }

  renderSquare(i) {
    onClick={() => this.handleClick()}
    return <Square squareNumber = {i}/>;


  }

  render() {
    const status = 'Next player: ' + (this.state.char ? 'y' : 'O');

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
    if (array[x] && array[x] === array[y] && array[x] === array[x]) {
      return array[x];
    }
  }
  return null;
}

function PlayerCheck(num) {
  if(num%2 === 0) {
    return "x";
  }
  else {
    return "o";
  }
}
