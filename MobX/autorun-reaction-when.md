- CodeSandbox: https://codesandbox.io/s/vanilla-js-mobx-boilerplate-k6785

MobX에서 `autorun`, `reaction`, `when` 차이점 실습 예제:

```javascript
import { observable, autorun, reaction, when } from "mobx";

const calculator = observable({
  a: 1
});

// 최초에 한 번 호출되고나서 변경될 때마다 호출
autorun(() => console.log(`autorun(): ${calculator.a}`));

// 변경될 때마다 호출
reaction(
  () => calculator.a,
  (value, reaction) => {
    console.log(`reaction(): ${value}`);
    // reaction.dispose();
  }
);

// 기다렸다가 조건문 참일 때 한 번만 호출
when(
  () => calculator.a === "string1",
  () => console.log(`when(): ${calculator.a}`)
);

// autorun, reaction, when 동작 순서는 정의된 위치에 따라 정해진다.

calculator.a = 10;  // 값 변경: autorun(), reaction()
calculator.a = 10;  // 값 같으므로 미호출
calculator.a = 20;  // 값 변경: autorun(), reaction()
calculator.a = "string1"; // 값 변경: autorun(), reaction() + 조건 만족: when()
calculator.a = "string1"; // 값 같으므로 미호출
calculator.a = "string2"; // 값 변경: autorun(), reaction()
calculator.a = "string1"; // 값 변경: autorun(), reaction()
```

`console.log()` 결과:

```
autorun(): 1 
autorun(): 10 
reaction(): 10 
autorun(): 20 
reaction(): 20 
autorun(): string1 
reaction(): string1 
when(): string1 
autorun(): string2 
reaction(): string2 
autorun(): string1 
reaction(): string1 
```
