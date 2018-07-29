import React from 'react';
import '../index.css';
import Square from "./square";


class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        squareNumber = {this.props.squares[i]}
        clickHandler = {() => this.props.turnCheck(i)}
      />
    )
  }

  createBoard() {
      let rows = [];
      for(var i = 0; i < 3; i++){
          let squaresArray = []; //for every row
          for(var j = 0; j < 3; j++){
            squaresArray.push(this.renderSquare(3*i+j)); // [[0,1,2], [3,4,5], [6,7,8]]
          }
          rows.push(<div className="board-row">{squaresArray}</div>); //push the rows (1,2,3)
      }
      return rows;
}

  render() {
      return (
        <div class="board">
          {this.createBoard()}
        </div>
      );
    }
}


export default Board;
