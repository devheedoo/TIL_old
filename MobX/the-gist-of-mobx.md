> - 출처: [The Gist of MobX | MobX](https://mobx.js.org/intro/overview.html)
> - JSFiddle: https://jsfiddle.net/devheedoo/kxqmvg9u/2/

매초 카운트하면서 클릭 시 초기화되는 버튼

- index.js:

```javascript
var appState = mobx.observable({
    timer: 0
});

appState.resetTimer = function() {
    appState.timer = 0;
};

setInterval(function() {
    appState.timer += 1.0;
}, 1000);
        
var TimerView = mobxReact.observer(React.createClass({
     render: function() {
        return (<button onClick={this.onReset}>
        	Seconds passed: {this.props.appState.timer}
            </button>);
     },
     
     onReset: function() {
     	this.props.appState.resetTimer();
     }
}));

ReactDOM.render(<TimerView appState={appState} />, document.body);
```

- index.css:

```css
button { cursor: pointer; }
```
