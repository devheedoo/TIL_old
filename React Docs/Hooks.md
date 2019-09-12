# React: Hooks

## 1. Introducing Hooks

> 출처: https://reactjs.org/docs/hooks-intro.html

*Hooks*는 React 16.8에서 새로 추가되었다. 클래스 생성 없이 state 등의 기능을 사용할 수 있다.

```react
import React, { useState } from 'react';

function Example() {
  // Decalre a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### No Breaking Changes

- React에서 클래스를 제거할 계획은 없다.
- 기존의 React 개념을 흔들지 않는다.

### Motivation

- 컴포넌트간 정적인 로직을 재사용하기 힘들었다.
- 점점 컴포넌트들을 이해하기 어려워진다.
- 클래스가 사람과 기계를 혼란시킨다.

## 2. Hooks at a Glance

> 출처: https://reactjs.org/docs/hooks-overview.html

### State Hook

### Effect Hook

### Rules of Hooks

### Building Your Own Hooks

### Other Hooks

### Next Steps

