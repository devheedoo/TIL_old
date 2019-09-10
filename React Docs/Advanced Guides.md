# React Docs - 고급 안내서

> - https://ko.reactjs.org/docs/accessibility.html
> - https://reactjs.org/docs/accessibility.html

## 접근성: a11y

- [WCAG](https://www.w3.org/WAI/intro/wcag)
- JSX에서는 모든 `aria-*` HTML 어트리뷰트를 지원하고 있습니다.

> Q: 앱에서도 접근성 고려?

## 코드 분할

- 번들링: 여러 파일을 하나로 병합하는 과정
- 코드 분할: 런타임시 여러 번들을 동적으로 만들고 불러오기
- 앱에 코드 분할을 도입하는 가장 좋은 방법은 동적 `import()` 문법을 사용하는 방법입니다.
- `React.lazy` 함수를 사용하면 동적 import를 사용해서 컴포넌트를 렌더링 할 수 있습니다.
- `MyComponent`를 렌더링할 때 `OtherComponent`를 포함하는 모듈이 아직 로드되지 않았다면, 로드를 기다리는 동안 로딩처럼 예비 컨텐츠를 보여줘야 합니다. 이는 `Suspense` 컴포넌트를 사용하여 처리할 수 있습니다.

> Q: 현재 코드 분할 어떻게 되고 있는지

## Context

context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있습니다.

> MobX를 사용하기 때문에 나중에 읽기

## Error Boundaries

Error boundaries are React components that **catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI**.

> 현재 사용중이지 않으므로 나중에 읽기

## Ref 전달하기

Ref forwarding is a technique for automatically passing a [ref](https://ko.reactjs.org/docs/refs-and-the-dom.html) through a component to one of its children.

```react
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

> Q: 용도를 더 정확히 파악해야 한다.

## Fragment

- Fragments는 DOM에 별도의 노드를 추가하지 않고 여러 자식을 그룹화할 수 있습니다.
- 단축 문법: `<>...</>`
- Fragments에 `key`가 있다면 `<React.Fragment>` 문법으로 명시적으로 선언해야 합니다.

## 고차 컴포넌트

A higher-order component (HOC) is an advanced technique in React for reusing component logic.

- **a higher-order component is a function that takes a component and returns a new component.**

  ```react
  const EnhancedComponent = higherOrderComponent(WrappedComponent);
  ```

- 예제: CommentList, BlogPost, withSubscription

- Instead mutation, use composition

  ```react
  function logProps(InputComponent) {
    InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    };
    // The fact that we're returning the original input is a hint that it has
    // been mutated.
    return InputComponent;
  }
  
  // EnhancedComponent will log whenever props are received
  const EnhancedComponent = logProps(InputComponent);
  ```

  ```react
  function logProps(WrappedComponent) {
    return class extends React.Component {
      componentWillReceiveProps(nextProps) {
        console.log('Current props: ', this.props);
        console.log('Next props: ', nextProps);
      }
      render() {
        // Wraps the input component in a container, without mutating it. Good!
        return <WrappedComponent {...this.props} />;
      }
    }
  }
  ```

- The most common signature for HOCs looks like this:

  ```react
  // React Redux's `connect`
  const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
  ```

- Caveats

  - Don’t Use HOCs Inside the render Method: The problem here isn’t just about performance — remounting a component causes the state of that component and all of its children to be lost.

    ```react
    render() {
      // A new version of EnhancedComponent is created on every render
      // EnhancedComponent1 !== EnhancedComponent2
      const EnhancedComponent = enhance(MyComponent);
      // That causes the entire subtree to unmount/remount each time!
      return <EnhancedComponent />;
    }
    ```

  - Static Methods Must Be Copied Over: Use [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics) or export it separately.

    ```react
    // Define a static method
    WrappedComponent.staticMethod = function() {/*...*/}
    // Now apply a HOC
    const EnhancedComponent = enhance(WrappedComponent);
    
    // The enhanced component has no static method
    typeof EnhancedComponent.staticMethod === 'undefined' // true
    ```

  - Refs Aren’t Passed Through: Use `React.forwardRef` API.

## 다른 라이브러리와 통합하기

React can be used in any web application.

> 나중에 읽기

## JSX 이해하기

JSX just provides syntactic sugar for the `React.createElement(component, props, ...children)` function. The JSX code:

```react
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```

compiles into:

```react
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

- React Must Be in Scope

- Using Dot Notation for JSX Type

- User-Defined Components Must Be Capitalized

- Choosing the Type at Runtime: JSX type can't be an expression.

- JavaScript Expressions as Props

  ```react
  function NumberDescriber(props) {
    let description;
    if (props.number % 2 == 0) {
      description = <strong>even</strong>;
    } else {
      description = <i>odd</i>;
    }
    return <div>{props.number} is an {description} number</div>;
  }
  ```

- String Literals: When you pass a string literal, its value is HTML-unescaped.

- **Props Default to "True"**

  ```react
  <MyTextBox autocomplete />
  // equals:
  <MyTextBox autocomplete={true} />
  ```

- Spread Attributes: `...`

- **Children's in JSX**

  - A React component can also return an array of elements:

    ```react
    render() {
      // No need to wrap list items in an extra element!
      return [
        // Don't forget the keys :)
        <li key="A">First item</li>,
        <li key="B">Second item</li>,
        <li key="C">Third item</li>,
      ];
    }
    ```

  - Functions as Children:

    ```react
    // Calls the children callback numTimes to produce a repeated component
    function Repeat(props) {
      let items = [];
      for (let i = 0; i < props.numTimes; i++) {
        items.push(props.children(i));
      }
      return <div>{items}</div>;
    }
    
    function ListOfTenThings() {
      return (
        <Repeat numTimes={10}>
          {(index) => <div key={index}>This is item {index} in the list</div>}
        </Repeat>
      );
    }
    ```

  - Booleans, Null, and Undefined Are Ignored

## 성능 최적화

- Use the (Minified) Production Build: See many helpful warnings.
  
  - If Create React App, run: `npm run build`
  
- Profiling Components with the Chrome Performance Tab
  1. Temporarily **disable all Chrome extensions, especially React DevTools**. They can significantly skew the results!
  2. Make sure you’re running the application in the development mode.
  3. Open the Chrome DevTools **Performance** tab and press **Record**.
  4. Perform the actions you want to profile. Don’t record more than 20 seconds or Chrome might hang.
  5. Stop recording.
  6. React events will be grouped under the **User Timing** label.
  
- Profiling Components with the DevTools Profiler

  > Q: React Native에서 DevTools Profiler 사용 중?

- Virtualize Long Lists: Use "windowing" technique.

  - [react-window](https://react-window.now.sh/) and [react-virtualized](https://bvaughn.github.io/react-virtualized/) are popular windowing libraries.
  - You can also create your own windowing component, like [Twitter did](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3).

- Avoid Reconciliation: If no need, return `false` from `shouldComponentUpdate`.

  - instead of writing `shouldComponentUpdate()` by hand, you can inherit from [`React.PureComponent`](https://reactjs.org/docs/react-api.html#reactpurecomponent).

  > Reconciliation == 리렌더링?

- shouldComponentUpdate in Action

  - If the only way your component ever changes is when the `props.color` or the `state.count` variable changes, you could have `shouldComponentUpdate` check that:

    ```react
    class CounterButton extends React.Component {
      constructor(props) {
        super(props);
        this.state = {count: 1};
      }
    
      shouldComponentUpdate(nextProps, nextState) {
        if (this.props.color !== nextProps.color) {
          return true;
        }
        if (this.state.count !== nextState.count) {
          return true;
        }
        return false;
      }
    
      render() {
        return (
          <button
            color={this.props.color}
            onClick={() => this.setState(state => ({count: state.count + 1}))}>
            Count: {this.state.count}
          </button>
        );
      }
    }
    ```

  - If your component got more complex, you could use a similar pattern of doing a “shallow comparison” between all the fields of `props` and `state` to determine if the component should update. This pattern is common enough that React provides a helper to use this logic - just inherit from `React.PureComponent`. So this code is a simpler way to achieve the same thing:

    ```react
    class CounterButton extends React.PureComponent {
      constructor(props) {
        super(props);
        this.state = {count: 1};
      }
    
      render() {
        return (
          <button
            color={this.props.color}
            onClick={() => this.setState(state => ({count: state.count + 1}))}>
            Count: {this.state.count}
          </button>
        );
      }
    }
    ```


