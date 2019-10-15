# observer class 의 render 함수 사용

> 출처: https://hyeooona825.tistory.com/97

- MobX에서 `@observer`는 컴포넌트의 `shouldComponentUpdate()`를 호출하고 이 함수가 `render()`를 호출합니다.
- 그런데 익명함수는 인스턴스화 하기 전에는 메소드가 프로토타입에 존재하지 않기 때문에 `@observer`를 붙이더라도 `render()`를 호출할 수 없습니다.
- 아래 코드처럼 클래스를 생성하면 `render1()`은 프로토타입에, `render2()`는 인스턴스에 생성됩니다.
    
```javascript
class Sample {
  render1() {}
  render2 = () => {}
}
// 위, 아래는 같은 코드입니다.
"use strict"
class Sample {
  constructor() {
    this.render2 = () => {
    };
  }
  render1() {}
}
```
