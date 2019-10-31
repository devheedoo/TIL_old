# JSX

JSX를 사용하려면 2가지를 해야 한다;

1. 파일을 `.tsx` 확장자로 이름짓는다.
2. `jsx` 옵션을 활성화한다.

TypeScript는 3가지 JSX 모드를 지원한다: `preserve`, `react`, `react-native`. 이 모드들은 출력 결과에만 영향을 주고 타입 체킹에는 영향을 주지 않는다. 이 기능은 `--jsx` 옵션을 사용하거나 tsconfig.json 파일을 수정하여 사용할 수 있다.

| Mode           | Input     | Output                       | Output File Extension |
| :------------- | :-------- | :--------------------------- | :-------------------- |
| `preserve`     | `<div />` | `<div />`                    | `.jsx`                |
| `react`        | `<div />` | `React.createElement("div")` | `.js`                 |
| `react-native` | `<div />` | `<div />`                    | `.js`                 |

## The `as` opertaor

TypeScript에서는 assert 시 부등호 괄호를 사용한다. 이는 JSX 문법과 충돌을 야기하므로 `.tsx` 파일에서는 `as` 키워드로만 assert 한다.

```typescript
var foo = <foo>bar;	// no use in .tsx file
var foo = bar as foo;	// use 'as'
```

## Type Checking

TypeScript는 React가 하는 그대로 기본 DOM 요소와 커스텀 요소를 구분한다. 대문자일 경우 커스텀 요소다.

### Intrinsic elements

기본 요소들은 `JSX.IntrinsicElements` 라는 특별한 인터페이스를 통해 타입이 확인된다. 만약 이 인터페이스를 구현할 경우,  기본 요소를 체크할 수 있다:

```typescript
declare namespace JSX {
    interface IntrinsicElements {
        foo: any	// 모두 허용하려면 [elemName: string]: any;
    }
}
<foo />;	// ok
<bar />;	// error
```

### Value-based elements

값-기반 요소들은 스코프 내에서 확인한다.

```typescript
import MyComponent from "./MyComponent";
<MyComonent />;	// ok
<SomeOtherComponent />;	// error
```

### Function Component

(JSX 체크는 미루는 걸로...)





























































