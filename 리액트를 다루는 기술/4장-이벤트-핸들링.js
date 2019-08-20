import React, { Component } from 'react';

class EventPractice extends Component {
  state = {
    username: '',
    message: ''
  }
  /*
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }
  handleClick() {
    alert(this.state.message);
    this.setState({
      message: ''
    })
  }
  */

  // Babel의 transform-class-properties 문법 사용
  handleChange = (e) => {
    this.setState({
      // input 여러 개를 e.target.name을 이용해 핸들링
      [e.target.name]: e.target.value
    });
  }
  handleClick = () => {
    alert(this.state.username + ': ' + this.state.message);
    this.setState({
      username: '',
      message: ''
    })
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  }
  render() {
    return (
      <div>
        <h1>Event Practice</h1>
        <input type="text" name="username"
         placeholder="Type Username"
         value={this.state.username}
         onChange={this.handleChange}
        />
        <input type="text" name="message"
         placeholder="Type Message"
         value={this.state.message}
         onChange={this.handleChange}
         onKeyPress={this.handleKeyPress}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice;