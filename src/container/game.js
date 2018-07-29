import React from 'react';
import {connect} from "react-redux";
import Board from "../components/board";
import '../index.css';
import {moveStep, jumpTo} from "../actions/action.js"
import Player from "../constants/player";
import WinnerList from "../components/winnerList"
const dateTime = require('node-datetime');


class Game extends React.Component {
  constructor() {
     super();
     this.state = {
       winners: []
     }
  }
  componentDidMount() {

      (async () => {
        const response = await fetch('http://localhost:5000/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      });

      const responseParsed = await response.json();
            responseParsed.forEach((winner) => {
                winner.currentTime = winner.currentTime.slice(0,19). replace('T', " ");
            })

            this.setState({winners: responseParsed});

      })();
  }

  sendCurrentWinner(winner) {
        const currentDate = dateTime.create();
        const formatedDate = currentDate.format('Y-m-d H:M:S');
        (async () => {
           await fetch('http://localhost:5000/', {
             method: 'POST',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({formatedDate, winner})
           });
         })();
  }



  render() {


    const {histories, winner, currentStep, firstPlayerIs} = this.props;
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
      this.sendCurrentWinner(winner);
    } else {
      status = `Next Player: ${firstPlayerIs ? Player.FIRST_PLAYER : Player.SECOND_PLAYER}`;
    }

    const moves = histories.map((step, move) => {
      const menu = move ? `Go to the ${move} move` : 'start from the beginning';
         return (
           <li class="moves" key={move}>
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
              {winner ? <WinnerList winners={this.state.winners}/> : false}
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
