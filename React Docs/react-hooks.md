# React Hooks

## 1. Introducing Hooks

### Motivation

- It's hard to reuse stateful logic between components
  - Hooks allow you to reuse stateful logic without changing your component hierarchy.
- Complex components become hard to understand: using React Life Cycle like `componentDidMount`
  - Hooks let you split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data), rather than forcing a split based on lifecycle methods.
- Classes confuse both people and machines



## 2. Hooks at a Glance

### 📌 State Hook

```react
const [count, setCount] = useState(0);
```

- State doens't have to be an object
- Hooks don't work inside classes
- `useState` is a built-in Hooks

### ⚡️ Effect Hook

```react
function Example() {
	const [count, setCount] = useState(0);
  // this component sets the document title after React updates the DOM:
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  return (
  	// JSX...
  );
}
```

- `useEffect` perform side effects: can affect other components and can't be done curing rendering
- (optionally) returns "clean up" function: runs when the component unmounts
- runs after every render — *including the first render*

### ✌️ Rules of Hooks

1. Call Hooks at the top level, not inside loops, conditions, etc
2. Call Hooks from React function components

### 💡 Building Your Own Hooks

If you want to reuse some stateful logic between components, build your own hooks

```react
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeToFriendStatus(friendID, handleStatusChange);
    };
  });
  return isOnline;
}
```

### 🔌 Other Hooks

- `useContext`
- `useReducer`



## 3. Using the State Hook

### Hooks and Function Components

- You can use Hooks both `const` and `function` declarations
- Hooks don't work inside classes

### What's a Hook?

```react
import React, { useState } from 'react';
```

- Hook lets you "hook into" React features

### Recap

- Unlike `this.setState` in a class, updating a state variable **always replaces** it instead of merging it



## 4. Using the Effect Hook

There are 2 kinds of side effects: those that don't require cleanup, and those that do.

### Effects Without Cleanup

- Run some additional code after React has updated the DOM

- We did before:

  ```react
  componentDidMount() {
    document.titlte = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.titlte = `You clicked ${this.state.count} times`;
  }
  ```

- Happen "after render"

- Each effect "belongs" to a particular render

### Effects with Cleanup

- We did before:

  ```react
  componentDidMount() {}
  componentWillUnmount() {}
  ```

- Returning functions runs when it is time to clean up — `componentWillUnmount`

  ```react
  useEffect(() => {
    function handleStatusChange(status) {};
    return function cleanup() {};
  }
  ```

### Tips for Using Effects

- React will apply *every* effect in the order they were specified

- Effects: componentDidMount, componentDidUpdate

- Cleanup: componentDidUpdate, componentWillUnmount

- Optimizing by skipping effects:

  ```react
  useEffect(() => {
    document.title = `You clicked ${count} times`
  }, [count]);	// Only re-run the effect if count changes
  ```

- If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument.

> Forgetting to handle `componentDidUpdate` properly is a common source of bugs in React applications.



## 5. Rules of Hooks

2 rules when using Hooks:

- **Only Call Hooks at the Top Level**
  - Don't inside loops, conditions, or nested functions
- **Only Call Hooks from React Functions**
  - Don't from regular JavaScript Functions

And,

- ESLint plugin: eslint-plugin-react-hooks

- Put a condition *inside* our Hook:

  ```react
  useEffect(function persistForm() {
    // 👍 We're not breaking the first rule anymore
    if (name !== '') {
      localStorage.setItem('formData', name);
    }
  });
  ```



## 6. Building Your Own Hooks

### Extracting a Custom Hook

A custom Hook is:

- JavaScript function whose name starts with "use"
- may call other Hooks

```react
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  // ...
  return isOnline;
}
```

### Using a Custom Hook

- All state and effects inside of custom Hooks are fully isolated

- Since Hooks are functions, we can pass information between them

  ```react
  // setRecipientID calls useFriendStatus with changed RecipientId
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);
  ```

### useYourImagination()

- todosReducer:

    ```react
    function todosReducer(state, action) {
      switch (action.type) {
    case 'add':
          return [...state, {
            text: action.text,
            completed: false
          }];
        // ... other actions ...
    default:
          return state;
      }
    }
    ```
    
- useReducer(simplified):

    ```react
    function useReducer(reducer, initialState) {
      const [state, setState] = useState(initialState);

      // reducer 함수의 결과로 state를 변경해주는 dispatch
      function dispatch(action) {
        const nextState = reducer(state, action);
        setState(nextState);
      }

      return [state, dispatch];
    }
    ```
    
- reducer example:

    ```react
    function Todos() {
      const [todos, dispatch] = useReducer(todosReducer, []);
      
      function handleAddClick(text) {
        dispatch({ type: 'add', text });
      }
      
      // ...
    }
    ```



## 7. Hooks API Reference

> https://reactjs.org/docs/hooks-reference.html

### Basic Hooks

- `useState`
- `useEffect`
- `useContext`

### Additional Hooks

- `useReducer`
- `useCallback`
- `useMemo`
- `useRef`
- `useImperativeHandle`
- `useLayoutEffect`
- `useDebugValue`

