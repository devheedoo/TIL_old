import React, { Component } from 'react';

class IterationSample extends Component {
  state = {
    names: ['눈사람', '얼음', '눈', '바람'],
    name: ''
  };
  handleChange = (e) => {
    this.setState({
      name: e.target.value
    });
  };
  handleInsert = () => {
    this.setState({
      names: this.state.names.concat(this.state.name),
      name: ''
    });
  };
  handleRemove = (index) => {
    const { names } = this.state;
    this.setState({
      // 전개 연산자와 slice를 이용한 방법
      // names: [
      //   ...this.state.names.slice(0, index),
      //   ...this.state.names.slice(index + 1, names.length)
      // ]
      // filter를 이용한 방법
      names: names.filter((item, i) => i !== index)
    });
  }
  render() {
    const nameList = this.state.names.map(
      (name, index) => (
        <li
          key={index}
          onDoubleClick={() => this.handleRemove(index)}
        >{name}</li>
      )
    );
    return (
      <div>
        <input
          onChange={this.handleChange}
          value={this.state.name} />
        <button onClick={this.handleInsert}>추가</button>
        {nameList}
      </div>
    );
  }
}

export default IterationSample;