# Ten minute introduction to MobX and React

>  출처: [MobX: Ten minute introduction to MobX and React](https://mobx.js.org/getting-started.html)

## The core idea

state는 애플리케이션에서 심장과 같다. 하지만 state 관리는 어렵다.

MobX는 내용이 다른 state가 생기지 못하도록 만들었다. 애플리케이션 state에서 파생될 수 있는 모든 것이 자동으로 파생되도록 만든 것이다.

1. *애플리케이션 state*가 있다.
2. *derivations*는 애플리케이션 state에서 파생될 수 있는 모든 값이다.
3. *reactions*는 애플리케이션 state에서 파생되지만 값을 반환하지 않는 것이다.
4. *actions*는 state를 변경하는 모든 것이다.

## A simple todo store...

MobX가 적용되지 않은 예제:

```javascript
class TodoStore {
	todos = [];

	get completedTodosCount() {
    	return this.todos.filter(
			todo => todo.completed === true
		).length;
    }

	report() {
		if (this.todos.length === 0)
			return "<none>";
		return `Next todo: "${this.todos[0].task}". ` +
			`Progress: ${this.completedTodosCount}/${this.todos.length}`;
	}

    addTodo(task) {
		this.todos.push({
			task: task,
			completed: false,
            assignee: null
		});
	}
}

const todoStore = new TodoStore();
```

예제 결과 테스트:

```javascript
todoStore.addTodo("read MobX tutorial");
console.log(todoStore.report());

todoStore.addTodo("try MobX");
console.log(todoStore.report());

todoStore.todos[0].completed = true;
console.log(todoStore.report());

todoStore.todos[1].task = "try MobX in own project";
console.log(todoStore.report());

todoStore.todos[0].task = "grok MobX tutorial";
console.log(todoStore.report());               
```

결과는 아래와 같다:

```
Next todo: "read MobX tutorial". Progress: 0/1
Next todo: "read MobX tutorial". Progress: 0/2
Next todo: "read MobX tutorial". Progress: 1/2
Next todo: "read MobX tutorial". Progress: 1/2
Next todo: "grok MobX tutorial". Progress: 1/2
```

## Becoming reactive

이 코드가 제일 중요하다:

- `autorun()`을 이용해 state가 바뀔 때 자동으로 `report()`를 호출하는 *reaction*을 만든다.
- `@computed` 데코레이션을 이용해 `completedTodosCount`를 자동으로 세는 *derivation*을 만든다.

```javascript
class ObservableTodoStore {
	@observable todos = [];
  @observable pendingRequests = 0;

  constructor() {
    mobx.autorun(() => console.log(this.report));
  }

	@computed get completedTodosCount() {
  	return this.todos.filter(
			todo => todo.completed === true
		).length;
  }

	@computed get report() {
		if (this.todos.length === 0)
			return "<none>";
		return `Next todo: "${this.todos[0].task}". ` +
			`Progress: ${this.completedTodosCount}/${this.todos.length}`;
	}

	addTodo(task) {
		this.todos.push({
			task: task,
			completed: false,
			assignee: null
		});
	}
}

const observableTodoStore = new ObservableTodoStore();
```

`autorun()`은 *reaction*을 한 번 생성한 후, **함수 안에 있는 observable 데이터가 바뀔 때마다** 호출한다.

예제 결과 테스트:

```javascript
observableTodoStore.addTodo("read MobX tutorial");
observableTodoStore.addTodo("try MobX");
observableTodoStore.todos[0].completed = true;
observableTodoStore.todos[1].task = "try MobX in own project";
observableTodoStore.todos[0].task = "grok MobX tutorial";
```

결과는 아래와 같다:

```javascript
Next todo: "read MobX tutorial". Progress: 0/1
Next todo: "read MobX tutorial". Progress: 0/2
Next todo: "read MobX tutorial". Progress: 1/2
Next todo: "grok MobX tutorial". Progress: 1/2
```

`report()`에서 `todos[0].task`와 `completedTodosCount`(`todo.completed`)만 다룬다. 테스트 코드의 4번째 줄은 `autorun()`를 호출하지 않는다.

더 정확히 설명하면 `todos[0].task` 값이나 `todos`의 `complete` 값이 **변할 때만** `autorun()`이 호출된다는 것이다. 다음 테스트 코드들을 추가해도 `autorun()`을 호출하지 않는다는 뜻이다:

```javascript
observableTodoStore.todos[0].task = "grok MobX tutorial";	// task 값이 이전 상태값과 같음
observableTodoStore.todos[0].completed = true;	// completed 값이 이전 상태값과 같음
observableTodoStore.todos[0].assignee = "Choco Kim";	// assignee는 observable 아님
```

## Making React reactive

`mobx-react` 패키지의 `@observer` 데코레이터는 React component `render()`를 `autorun()`에 감싼다. 이러면 컴포넌트는 state와 항상 자동으로 동기화된다:

```javascript
@observer
class TodoList extends React.Component {
  render() {
    const store = this.props.store;
    return (
      <div>
        { store.report }
        <ul>
        { store.todos.map(
          (todo, idx) => <TodoView todo={ todo } key={ idx } />
        ) }
        </ul>
        { store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null }
        <button onClick={ this.onNewTodo }>New Todo</button>
        <small> (double-click a todo to edit)</small>
        <RenderCounter />
      </div>
    );
  }

  onNewTodo = () => {
    this.props.store.addTodo(prompt('Enter a new todo:','coffee plz'));
  }
}

@observer
class TodoView extends React.Component {
  render() {
    const todo = this.props.todo;
    return (
      <li onDoubleClick={ this.onRename }>
        <input
          type='checkbox'
          checked={ todo.completed }
          onChange={ this.onToggleCompleted }
        />
        { todo.task }
        { todo.assignee
          ? <small>{ todo.assignee.name }</small>
          : null
        }
        <RenderCounter />
      </li>
    );
  }

  onToggleCompleted = () => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  }

  onRename = () => {
    const todo = this.props.todo;
    todo.task = prompt('Task name', todo.task) || todo.task;
  }
}

// observableTodoStore: 미리 정의됨
ReactDOM.render(
  <TodoList store={ observableTodoStore } />,
  document.getElementById('reactjs-app')
);
```

예제 결과 테스트:

```javascript
const store = observableTodoStore;
store.todos[0].completed = !store.todos[0].completed;
store.todos[1].task = "Random todo " + Math.random();
store.todos.push({ task: "Find a fine cheese", completed: true });
// etc etc.. add your own statements here...
```

결과는 아래와 같다:

```javascript
Next todo: "grok MobX tutorial". Progress: 0/2	// 2번째 줄에서 호출
Next todo: "grok MobX tutorial". Progress: 1/3	// 4번째 줄에서 호출
```

## Working with references

MobX의 참조가 어떤 식으로 이루어지는지 궁금할 것이다. assignee 속성에 새 store를 연결해보자:

```javascript
var peopleStore = mobx.observable([
    { name: "Michel" },
	{ name: "Me" }
]);
observableTodoStore.todos[0].assignee = peopleStore[0];
observableTodoStore.todos[1].assignee = peopleStore[1];
peopleStore[0].name = "Michel Weststrate";
```

데이터를 정규해줄 필요도 없고, 새 스토어를 추가해도 잘 연동된다. JavaScript 참조도 정상적으로 동작한다. MobX는 단지 자동으로 추적할 뿐이다.

## Asynchromous actions

모든게 state로부터 파생되기 때문에 언제 state가 변경되는지는 상관없다. 비동기 함수를 추가할 수 있다:

```javascript
observableTodoStore.pendingRequests++;
setTimeout(function() {
    observableTodoStore.addTodo('Random Todo ' + Math.random());
    observableTodoStore.pendingRequests--;
}, 2000);
```

## DevTools

MobX + ReactJS 앱에서 [mobx-react-devtools](https://github.com/mobxjs/mobx-react-devtools)를 사용할 수 있다. 데이터 변화와 그에 따른 렌더링 항목을 확인할 수 있다.

## Conclusion

끝이다! 보일러 플레이트는 없다. 배운 내용을 짧게 요약하면:

1. @observable 또는 observable 함수를 사용해 MobX가 객체를 추적하게 만든다.
2. @computed 데코레이터는 state로부터 자동으로 파생되는 값을 생성하는 함수를 만든다.
3. autorun()은 함수 내에서 사용한 observable state가 변하면 자동으로 호출된다. 로깅, 네트워크 요청 등에 유용한다.
4. mobx-react 패키지의 observer 데코레이터는 React 컴포넌트가 truly reactive하게 해준다.

## MobX is not a state container

MobX를 Redux의 대체제로 사용하는 경우가 많다. 하지만 MobX는 단지 라이브러리이다. 아키텍쳐나 상태 콘테이너가 아니다.

