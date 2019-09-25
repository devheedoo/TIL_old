프로젝트에서 리팩토링 중 **Promise** 대신 **async/await**를 사용하고 있다. **async/await**로 비동기 요청 여러 개를 병렬적으로 호출하고 싶었다. 다음 두 글이 도움이 됐다.

- [[번역] async/await 를 사용하기 전에 promise를 이해하기 - Kiwan Jung | Medium](https://medium.com/@kiwanjung/%EB%B2%88%EC%97%AD-async-await-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%A0%84%EC%97%90-promise%EB%A5%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-955dbac2c4a4)
- [JavaScript Async/Await: Serial, Parallel and Complex Flow | TechBrij](https://techbrij.com/javascript-async-await-parallel-sequence)
- [Promise.all() - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

확인 결과 **async/await**만으로는 불가능하다. `Promise.all()`의 도움을 받아야 한다.

여기에 깔끔하게 **비구조화 문법**까지 더하면:

```javascript
// getFoo(), getBar() returns Promise object
let [foo, bar] = await Promise.all([getFoo(), getBar()]);
```
