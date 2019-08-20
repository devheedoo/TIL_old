import React, { Component } from 'react';

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null
  };

  myRef = null;

  // 마운트 과정
  // constructor - getDerivedStateFromProps - render - componentDidMount

  constructor(props) {
    super(props);
    console.log('constructor');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  // 업데이트 과정
  // getDerivedStateFromProps - shouldComponentUpdate - render
  // - getSnapshotBeforeUpdate - componentDidUpdate

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    return nextState.number % 4 !== 0;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState);
    if (snapshot) {
      console.log('업데이트 되기 직전 색상: ', snapshot);
    }
  }

  // 언마운트 과정
  // componentWillUnmount

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  // 클릭 이벤트 함수
  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    });
  }

  render() {
    console.log('render');

    const style= { color: this.props.color }

    return (
      <div>
        <h1
          style={style}
          ref={ref => this.myRef=ref}
        >
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;