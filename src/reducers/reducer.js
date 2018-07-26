
class Player {
  static FIRST_PLAYER = 'x';
  static SECOND_PLAYER = "o"
}


const initialState = {

    histories: [Array(9).fill(null)],
    currentStep: 0,
    firstPlayerIs: true,
    winner: null

}

export default function reducer(state = initialState, action) {


  switch (action.type) {

    case "Move": {
      const {currentStep, winner, firstPlayerIs} = this.state
      const histories = this.state.histories.slice(0, currentStep + 1);
      const square = histories[histories.length - 1];
      const squareCopy = square.slice();
      if(squareCopy[action.squareNumber] !== null || winner) {
        return;
      }
      squareCopy[action.squareNumber] = playerDetect(this.state.firstPlayerIs);

      histories.push(squareCopy)
        return [
          ...state,
          {
          histories,
          firstPlayerIs: !firstPlayerIs,
          currentStep: currentStep + 1,
          winner: winnerCheck(squareCopy)
        }
      ]

      break;
    }
    case "Jump": {
      const {histories, currentStep, winner, firstPlayerIs} = this.state
      return [
        ...state,
        {
        histories,
        firstPlayerIs,
        currentStep: action.move,
        winner,
        }
      ]
      break;
    }
    default:
      return state;
  }
};

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
function playerDetect(firstPlayerIs) {

        if(firstPlayerIs) {
          return Player.FIRST_PLAYER;
        }
        else {
          return Player.SECOND_PLAYER;
        }

      }
