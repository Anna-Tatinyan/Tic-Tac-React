import React from 'react';
import '../index.css';
import Board from "../components/board";
import {connect} from "react-redux";
import {moveStep, jumpTo} from "../actions/action.js"

class Game extends React.Component {


  render() {

    const {histories, winner, currentStep} = this.props;

    let status;
    if (winner) {
     status = 'Winner: ' + winner;
    } else {
     status = `Next Player: x`;
    }
    const moves = histories.map((step, move) => {
     const menu = move ? `Go to ${move} move` : 'start from the beginning';
     return (
       <li key={move}>
         <button
           onClick={() => {
             this.props.jumpTo(move)
             }
           }
           >{menu}</button>
       </li>
     );
    });
    return (

      <div className="game">
        <div className="game-board">
          <Board
            squares={histories[currentStep]}
            turnCheck={(squareNumber) => this.props.moveStep(squareNumber)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{moves}</div>

        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      histories: state.histories,
      firstPlayerIs: state.firstPlayerIs,
      currentStep: state.currentStep,
      winner: state.winner

  };
}


export default connect(mapStateToProps, {moveStep, jumpTo})(Game)
