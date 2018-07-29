import React from 'react';
import '../index.css';
import Game from "../container/game"

const  WinnerList  = ( ({winners}) => {
  return (
    <div className='winnerList'>
            <h3>That is the history of all the winners</h3>
            <ul>
                {winners.map((winner, index) => {
                    return (
                    <li class="winners" key={index}>{`${winner.currentTime} ${winner.winnerCharacter}`}</li>
                    );

                })}
            </ul>
        </div>
    );
})


export default WinnerList;
