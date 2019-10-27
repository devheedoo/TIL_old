# Variable Declarations

- `const` 는 재선언이 불가능한 `let` 이다.

## var declarations

- `var` 키워드로 선언한다.
- `var` 로 선언하면 전역에서 사용 가능하다.

```javascript
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
// 10 (repeat 10 times)
```

- for 루프를 실행하고, 스택에 쌓였던 10개의 `setTimeout()` 이 실행된다. 인자로 넘겼던 `i` 가 전역 변수이기 때문에 이미 `i` 값은 10이 된 채로 10개의 `setTimeout()` 이 실행된다.

- 1, 2, ..., 10이 출력되게 하려면 IIFE 패턴을 사용한다.

```javascript
for (var i = 0; i < 10; i++) {
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
}
```

## let declarations

- Block-scoping

```javascript
function foo() {
    // okay to capture 'a'
    return a;
}

// illegal call 'foo' before 'a' is declared
// runtimes should throw an error here
foo();

let a;
```

- TypeScript가 TDZ-호이스팅을 알려준다.
- Re-declarations and Shadowing
- 같은 변수에 대해 두 번 `let` 으로 선언할 수 없다.
- 다른 블럭일 경우 함수 인자와 같은 이름을 사용할 수 있다.

```javascript
function f(condition, x) {
    if (condition) {
        let x = 100;
        return x;
    }
    return x;
}
```

- Block-scoped variable capturing
- 단순히 블록 단위로 변수를 저장하는 게 아니라, 환경을 만들어 저장한다.

```javascript
for (let i = 0; i < 10 ; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
```

## const declarations

- `let` 과 스코프 규칙은 같지만, 선언 시에 한 번만 할당할 수 있다.
- 하지만 immutable과 헷갈려서는 안 된다. 객체로 선언된 `const` 변수의 프로퍼티는 mutable하다.
- 다행히 TypeScript에서는 객체의 프로퍼티까지 모두 readonly하게 선언할 수 있다.

## Destructuring

- Array destructuring

```javascript
let input = [1, 2];
let [first, second] = input;
// first = input[0]; second = input[1];
```

- Default values

```typescript
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}
```

- `b?` 는 `b` 가 `undefined` 일 수도 있음을 나타낸다.
- spreading은 왼쪽에서 오른쪽으로 수행되기 때문에 같은 프로퍼티명이 있을 경우 오른쪽 값으로 덮어씌워진다.

