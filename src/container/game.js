import React from 'react';
import {connect} from "react-redux";
import Board from "../components/board";
import '../index.css';
import {moveStep, jumpTo} from "../actions/action.js"

class Game extends React.Component {


  render() {

    const {histories, winner, currentStep, firstPlayerIs} = this.props;

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = `Next Player: ${firstPlayerIs ? 'X' : 'O'}`;
    }
    const moves = histories.map((step, move) => {
      const menu = move ? `Go to the ${move} move` : 'start from the beginning';
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
        currentStep: state.currentStep,
        firstPlayerIs: state.firstPlayerIs,
        winner: state.winner

  };
}


export default connect(mapStateToProps, {moveStep, jumpTo})(Game);
