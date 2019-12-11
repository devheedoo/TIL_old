# React Hooks

## Introducing Hooks

### Motivation

- It's hard to reuse stateful logic between components
  - Hooks allow you to reuse stateful logic without changing your component hierarchy.
- Complex components become hard to understand: using React Life Cycle like `componentDidMount`
  - Hooks let you split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data), rather than forcing a split based on lifecycle methods.
- Classes confuse both people and machines



## Hooks at a Glance

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

