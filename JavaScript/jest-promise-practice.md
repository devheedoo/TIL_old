JavaScript를 막 다루기 시작한 동료의 질문에서 시작됐다.

- A > B > 완료하는 프로세스에서,
- A 에서 오류가 발생하면 에러를 반환하고 끝난다
- B 에서 오류가 발생하면 에러를 반환하고 끝난다

처음 동료가 생각한 해결방법이다:

```javascript
var asyncThing1, asyncThing2;
var asyncRecovery1, asyncRecovery2;

asyncThing1().catch(function() {
  return asyncRecovery1();
}).then(function() {
  return asyncThing2();
}).catch(function() {
  return asyncRecovery2();
});
```

이렇게 구현할 경우 `asyncThing1` 과 `asyncThing2` 의 결과가 모두 `false` 일 때 `asyncRecovery1` , `asyncRecovery2` 가 모두 호출된다.

이렇게 간단해보이는 상황인데 `async/await` 로 어떻게 처리하면 되는지 대답할 수 없었다. 잠시 작업을 중단하고 다시 `Promise` 복습을 했다.

일단 `then` 문법으로 구현했다.

```javascript
asyncThing1().then(function() {
  return asyncThing2();
}, function(err) {
  return asyncRecovery1();
}).catch(function)
```

 `asyncThing1` 과 `asyncThing2` 의 결과가 모두 `false` 일 때 `asyncRecovery1` 만 호출된다.

이제 `async/await` 로 바꾸면 된다. 똑똑한 VS Code 가 알아서 바꿔줬다...

```javascript
try {
  try {
    await asyncThing1();
  } catch (e) {
    asyncRecovery1();
  }
  return asyncThing2();
} catch (e) {
  return asyncRecovery2();
}
```



async/await 와 에러 처리

async/await 를 사용하면 try/catch 를 이용해 에러를 처리할 수 있다. 이는 동기/비동기를 구분하지 않고 일관되게 try/catch 로 에러를 처리할 수 있다는 점에서 then 보다 유용하다.

https://www.daleseo.com/js-async-async-await/ :

> 동기/비동기 구분없이 `try/catch`로 일관되게 예외 처리를 할 수 있는 부분도 async/await를 사용해서 코딩했을 때의 큰 이점 중 하나입니다.

하지만 모든 async 함수를 try로 처리하다보면 try 지옥에 빠질 수 있다. 이렇게 try 가 많아지는 경우, 또는 하나의 await 코드에만 에러 처리를 하고 싶을 경우 에러를 `Promise` 형태로 반환해주는  `Promise.prototype.catch` 함수를 사용할 수 있다. 이렇게 하면 비동기 코드의 에러가 동기 코드와 뒤섞이는 걸 깔끔하게 예방할 수 있다.

https://itnext.io/async-await-without-try-catch-in-javascript-6dcdf705f8b1 :

> This allows to explicitly catch errors for the async function

wrapper 함수를 사용하면 try/catch 를 사용하지 않을 수도 있다. 배열로 처리할 수 있지만 객체가 더 좋다.

```javascript
// wrapper.js
const wrapper = promise => (
  promise
    .then(data => ({ data, error: null }))
    .catch(error => ({ error, data: null }))
);
module.exports = wrapper;
```

https://dev.to/sadarshannaiynar/capture-error-and-data-in-async-await-without-try-catch-1no2



위에 구현했던 코드에 wrapper 함수를 적용하면:

```javascript
const wrapper = require('./wrapper');

const {data, error} = await wrapper(asyncThing1());
if (error) {
  asyncRecovery1();
} else {
  const {data, error} = await wrapper(asyncThing2());
  if (error) asyncRecovery2();
}
```



잠깐 여기서 테스트를 할 때 아래 코드에서 `asyncThing1` , `asyncThing2` 를 번갈아 주석처리하면서 테스트했다.

```javascript
function getSuccess() {
  return new Promise(function(resolve, reject) {
    resolve('success');
  })
}

function getFail() {
  return new Promise(function(resolve, reject) {
    reject(Error('fail'));
  })
}

asyncRecovery1 = function() { console.log('recovery1'); }
asyncRecovery2 = function() { console.log('recovery2'); }

asyncThing1 = getSuccess;
asyncThing1 = getFail;
asyncThing2 = getSuccess;
asyncThing2 = getFail;
```

이론과 예제로만 했던 Jest를 직접 사용해볼 때인 것 같다.













































