import React from 'react';
import '../index.css';

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

export default Square;
