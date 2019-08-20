import React, { Component } from 'react';
import StyledButton from './StyledButton';

class App extends Component {
  render() {
    return (
      <div>
        <StyledButton big>버튼</StyledButton>
        { /* <StyledButton big={true}>버튼</StyledButton> */}
      </div>
    );
  }
}

export default App;