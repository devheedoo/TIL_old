# Async functions - making promises friendly

https://developers.google.com/web/fundamentals/primers/async-functions

**NOTE:** 원본을 그대로 번역한 것이 아닙니다. 필요한 내용만 메모하듯이 요약한 글입니다.

Async 함수는 promise 기반의 코드를 작성할 수 있게 해줍니다. 비동기 코드를 조금 덜 똑똑하지만 더 가독성이 만듭니다.

Async 함수는 다음과 같이 동작합니다:

```javascript
async function myFirstAsyncFunction() {
  try {
    const fulfilledValue = await promise;
  }
  catch (rejectedValue) {
    // ...
  }
}
```

함수 선언 전에 async 키워드를 사용하면 그 함수 내에서 await를 사용할 수 있습니다. promise를 await하면 그 함수는 promise가 settled될 때까지 멈춥니다.

> settled: fulfilled(성공) 또는 rejected(실패) 상태 모두를 이르는 상태

## Exmaple: Logging a fetch

URL로부터 값을 가져와 응답을 기록하고 싶습니다. promise를 사용하면 다음과 같습니다:

```javascript
function logFetch(url) {
  return fetch(url)
  	.then(response => response.text())
  	.then(text => { console.log(text); })
  	.catch(err => { console.error('fetch failed', err); });
}
```

이를 async 함수로 구현하면:

```javascript
async function logFetch(url) {
  try {
    const response = await fetch(url);
    console.log(await response.text());
  }
  catch(err) {
    console.log('fetch failed', err);
  }
}
```

## Async return values

Async 함수는 *항상* promise를 반환합니다. await를 쓰든 말든 상관없습니다다.

## Example: Streaming a response

응답을 한 줄씩 읽으면서 총 길이를 세는 기능을 promise를 사용해 구현해보겠습니다:

```javascript
function getResponseSize(url) {
  return fetch(url).then(response => {
    const reader = response.body.getReader();
    let total = 0;

    return reader.read().then(function processResult(result) {
      if (result.done) return total;

      const value = result.value;
      total += value.length;
      console.log('Received chunk', value);
			// get the next result
      return reader.read().then(processResult);
    })
  });
}
```

내부 재귀호출을 통해 구현했습니다. 하지만 이는 가독성이 떨어집니다.

Async 함수를 사용해서 다시 구현해봅시다:

```javascript
async function getResponseSize(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  let result = await reader.read();
  let total = 0;
  
  while(!result.done) {
    const value = result.value;
    total += value.length;
    console.log('Received chunk', value);
    // get the next result
    result = await reader.read();
  }
  return total;
}
```

## Other async function syntax

Arrow 함수, Object의 메소드, Class의 메소드에서도 사용할 수 있습니다.

## Careful! Avoid going too sequential

혹시 병렬적으로 처리할 수 있는 부분은 없는지 항상 주의해야 합니다.

### Example: Outputting fetches in order

promise를 사용한 로그 출력 기능 예제입니다:

```javascript
function logInOrder(urls) {
  // fetch all the URLs
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // log them in order
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
```

async로 구현할 때 다음과 같이 구현할 수 있습니다:

```javascript
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
```

이 방법은 깔끔해보이지만 첫 번째 fetch 이후 응답을 모두 읽을 때까지 두 번째 fetch를 실행할 수 없습니다. 고맙게도 해결방법이 있습니다:

```javascript
async function logInOrder(urls) {
  // fetch all the URLs in parallel
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });
  
  // log them in sequence
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```

이후 내용은 생략합니다.