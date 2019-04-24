# JavaScript_Errors_and_Debugging

> from Codecademy: JavaScript Errors and Debugging

## Debugging

### 1. 에러가 발생하면 해결하기

Error Stack Trace는 3가지를 알려준다: Location, Type, Message. [Error Type](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error>)에 대해 알고 있어야 고칠 수 있다.

### 2. 에러가 없어도 버그가 있다. 버그 고치기.

> "A lack of thrown errors does not mean your code logic is completely correct."

에러가 없어도 버그가 있다. JavaScript에서는 `console.log()` 함수를 통해 버그를 찾고 제거한다.

`console.log()` 를 사용하더라도 어떻게 해결해야 할 지 막연할 수 있다. 그럴 때는 [JavaScript 문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript) 를 읽어본다.

### 3. 그래도 문제가 해결되지 않으면 구글에게 물어보기.

그래도 해결할 수 없으면 구글링하라. 스택 오버플로우 사이트는 큰 도움이 될 것이다.

## Error Handling

아래 구문을 이용해서 내 코드에 맞는 에러를 정의하고 사용하라.

```javascript
try {
  throw Error('An Error in try clause.');
} catch(e) {
  console.log(e);
}
```

## 추가 읽기자료

- [에러에 대한 생각 다르게 하기](https://news.codecademy.com/errors-in-code-think-differently/)
- [MDN: Error Type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [MDN: JavaScript Document](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
