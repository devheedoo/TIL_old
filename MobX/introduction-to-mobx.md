# MobX

## 0. Introduction

https://mobx.js.org/index.html

*Anything that can be derived from the application state, should be derived. Automatically.*

- `@observable`: 지켜볼 데이터(모든 타입)
- `@computed`: 데이터 변경 감지
- `@observer`: 리액트 컴포넌트에 적용

*MobX reacts to any existing observable property that is read during the execution of a tracked function.*

- Custom reactions:

```javascript
autorun(() => {
  console.log('Tasks left: ' + todos.unfinishedTodoCount)
});
```

## 1.1 The Gist of MobX

> https://mobx.js.org/intro/overview.html

1. Define your state and make it observable
2. Create a view that responds to changes in the State
   - Any function can become a reactive view.
   - MobX can be applied in any ES5 conformant JavaScript environment.
3. Modify the State

## 1.2 Concepts & Principles

> https://mobx.js.org/intro/concepts.html

### Concepts

#### State

*State* is the data that drives your application.

#### Derivations

*Anything* that can be derived from the *state* without any further interaction is a derivation. Derivations exist in many forms:

- The *user interface*.
- *Derived data*, such as the number of todos left.
- *Backend integrations* like sending changes to the server.

MobX distinguishes two kind of derivations:

- *Computed values*. These are values that can always be derived from the current observable state using a pure function.
- *Reactions*. Reactions are side effects that need to happen automatically if the state changes. These are needed as a bridge between imperative and reactive programming. Or to make it more clear, they are ultimately needed to achieve I/O.

> The golden rule is: if you want to create a value based on the current state, use `computed`.

#### Actions

An *action* is any piece of code that changes the *state*.

### Principles

- All *Derivations* are updated **automatically** and **atomically** when the *state* changes.
- All *Derivations* are updated **synchronously** by default.
- *Computed values* are updated **lazily**.
- All *Computed values* should be **pure**.

## Question

MobX의 `@observable` 데이터 비교는 deep, shallow 중 어떤 비교를 사용할까?

(답) `observable`은 기본적으로 deep 비교를 한다. 기본 modifier가 `.deep`이다.

> 출처: [Decorators | MobX](https://mobx.js.org/refguide/modifiers.html)

```javascript
class Store {
  @observable.ref collectionRef = [];
	@observable.shallow collectionShallow = [];
	@observable/*.deep*/ collectionDeep = [];
}
```

(추가) Action에 따라 적절한 modifier를 사용해야 한다.

> 출처: https://rannte.tistory.com/entry/react-native-mobx-action-observable

```javascript
class Store {
  @observable user = {
    name: 'myName',
    friends: [{ name: 'friendName' }]
  }
  @action editUser = () => {
    // 전달한다 (1번만)
    this.user.friends[0].name = 'newFriendName'
    // 전달한다 (3번이나)
    this.user = { name: 'myName', friends: [{ name: 'newFriendName' }]}
  }
}
```

두 번째 Action의 경우 observer에 전달을 3번 보내게 되고, 이는 리렌더링을 3번 발생시킨다. 따라서 API로부터 거대한 json 배열을 받는 Action의 경우, `.ref` modifier를 사용해야 성능 저하를 막을 수 있다.
