# JavaScript Promises: an Introduction

https://developers.google.com/web/fundamentals/primers/promises

**NOTE:** 원본을 그대로 번역한 것이 아닙니다. 필요한 내용만 메모하듯이 요약한 글입니다.

## What's all the fuss about?

> fuss: 호들갑, 벌썩, 야단

JavaScript는 싱글 스레드 위에서 동작합니다. 절대 동시에 2개의 스크립트를 실행할 수 없다는 의미입니다; 하나를 실행하고, 나머지 하나를 실행해야 합니다.

지금까지는 이벤트와 콜백 함수(이하 콜백)을 이렇게 사용했습니다:

```javascript
var img1 = document.querySelector('.img-1');

img1.addEventListener('load', function() {
  // woo yey images loaded
});

img1.addEventListener('error', function() {
  // argh everything's broken
});
```

하지만 리스너가 동작하기 전에 이벤트가 이미 발생했을 수도 있습니다. 따라서 이미지의 "complete" 프로퍼티를 사용해 다음과 같이 처리해야 합니다:

```javascript
var img1 = document.querySelector('.img-1');

function loaded() {
  // woo yey image loaded
}

if (img1.complete) {
  loaded();
} else {
  img1.addEventListener('load', loaded);
}

img1.addEventListener('error', function() {
  // argh everything's broken
}); 
```

이 방식도 리스너가 동작하기 전에 발생한 이미지 오류는 잡아낼 수 없습니다. DOM이 그런 방법을 제공해주지 않기 때문이죠. 게다가 이미지가 여러 개로 늘어나면 훨씬 일이 복잡해집니다.

## Events aren't always the best way

keyup, touchstart와 같이 똑같은 객체에 여러 번 발생하는 경우 이벤트를 사용하기 적합합니다. 하지만 이벤트의 성공/실패와 비동기적으로 동작하려면 다음과 같이 해야할 것입니다:

```javascript
img1.callThisIfLoadedOrWhenLoaded(function() {
  // loaded
}).orIfFailedCallThis(function() {
  // failed
});

// and...
whenAllTheseHaveLoaded([img1, img2]).callThis(function() {
  // all loaded
}).orIfSomeFailedCallThis(function() {
  // one or more failed
});
```

이는 프로미스가 하는 일을 이해하기 쉬운 함수명으로 적은 것입니다. 이미지 요소가 promise로부터 "ready" 메소드를 전달받으면 아래와 다음처럼 사용할 수 있습니다:

```javascript
img1.ready().then(function() {
  // loaded
}, function() {
  // failed
});

// and...
Promise.all([img1.ready(), img2.ready()]).then(function() {
  // all loaded
}, function() {
  // one or more failed
});
```

promise는 이벤트 리스너와 비슷하지만 다릅니다:

- promise는 오직 한 번만 성공하거나 실패합니다. 두 번 성공하거나, 두 번 실패할 수 없고, 바뀌지도 않습니다.
- promise가 성공하거나 실패한 이후에 콜백을 추가해도 정상적으로 동작합니다.

## Promise terminology

promise는 4가지 상태로 존재할 수 있습니다:

- fulfilled - 성공
- rejected - 실패
- pending - 아직 성공하거나 실패하기 전 (초기 상태)
- settled - 성공하거나 실패

만약 이렇게 promise처럼 동작할 수 있는 객체가 있으면 이 객체를 **thenable**하다고 합니다.

## Promises arrive in JavaScript!

promise는 이전부터 여러 라이브러리들 속에 구현되어 있었습니다:

- [Q](https://github.com/kriskowal/q)
- [when](https://github.com/cujojs/when)
- [WinJS](https://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
- [RSVP.js](https://github.com/tildeio/rsvp.js)

그리고 현재 JavaScript promise의 생성 문법입니다:

```javascript
var promise = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then...
  
  if (/* everything turned out fine */) {
    resolve("Stuff worked!");
  } else {
    reject(Error("It broke"));
	}
});
```

promise 생성자는 콜백 하나를 인자로 받습니다. 그리고 콜백은 resolve, reject 파라미터를 가집니다. 콜백 안의 코드는 비동기적으로 동작하고, 잘 완료되면 resolve를, 오류가 발생하면 reject를 호출합니다.

reject에서 `Error` 객체를 사용하는 건 필수가 아닙니다.

생성한 promise를 사용하는 방법입니다:

```javascript
promise.then(function(result) {
  console.log(result);	// "Stuff worked!"
}, function(err) {
  console.log(err); // Error: "It broke"
});
```

`then()`은 2개의 인자를 받습니다. 성공/실패 시에 사용할 콜백 함수 하나씩입니다. 둘 다 선택적으로 사용할 수 있습니다.

> 이것만으로는 이해가 잘 되지 않아서 MDN Reference 하나를 덧붙인다:
>
> ```javascript
> // using a resolved promise, the 'then' block will be triggered instantly, 
> // but its handlers will be triggered asynchronously as demonstrated by the console.logs
> const resolvedProm = Promise.resolve(33);
> 
> let thenProm = resolvedProm.then(value => {
>  console.log("this gets called after the end of the main stack. the value received and returned is: " + value);
>  return value;
> });
> // instantly logging the value of thenProm
> console.log(thenProm);
> 
> // using setTimeout we can postpone the execution of a function to the moment the stack is empty
> setTimeout(() => {
>  console.log(thenProm);
> });
> 
> 
> // logs, in order:
> // Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
> // "this gets called after the end of the main stack. the value received and returned is: 33"
> // Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: 33}
> ```
>
> - [Return value | Promise.prototype.then() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#Return_value)
> - JavaScript 메인 스택 내에서 promise를 `console.log()`로 호출하면 "pending" 상태인 `Promise` 객체를 확인할 수 있다.
> - `then()`의 반환 값은 `Promise` 객체이다.

## Browser support & polyfill

Chrome 32, Oprea 19, Firefox 29, Safari 8 & Microsoft Edge는 기본적으로 promise를 사용할 수 있습니다.

> 결국 IE만 지원하지 않는다는 말이다.
>
> - [Browser compatibility | Promise - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Browser_compatibility)

이전 버전에서 사용하려면 [링크](https://github.com/stefanpenner/es6-promise#readme)를 참고하십시오.

## Compatibility with other libraries

(생략)

## Complex async code made easier

코드를 작성해봅시다. 원하는 것은 다음과 같습니다:

1. 로딩 중임을 표시하기 위해 spinner(이하 빙글이)를 돌리기 시작합니다.
2. 이야기의 제목과 각 챕터 내용을 담은 JSON을 가져옵니다.
3. 페이지에 제목을 답니다.
4. 각 챕터 내용을 가져옵니다.
5. 페이지에 이야기 내용을 넣습니다.
6. 빙글이를 멈춥니다.

그러나 또한 위 과정 중에 오류가 발생하면 바로 빙글이를 멈추고 싶습니다. 그렇지 않고 빙글이가 계속 돌면 이는 어딘가에서 문제를 일으킬 것입니다.

### Promisifying XML HttpRequest

```javascript
function get(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    req.send();
  });
}
```

promisifying한 함수를 사용해봅시다:

```javascript
get('story.json').then(function(response) {
  console.log("Success!", response);
}, function(error) {
  console.error("Failed!", error);
});
```

## Chaining

`then()`이 끝이 아닙니다. then를 체이닝해서 차례대로 실행하도록 만들 수 있습니다.

### Transforming values

위 예제에서 받은  JSON 응답을 일반 텍스트로 변환해서 받고 싶으면 다음과 같이 할 수 있습니다:

```javascript
get('story.json').then(function(response) {
  return JSON.parse(response);
}).then(function(response) {
  console.log("Yey JSON!", response);
});
```

`JSON.parse()`가 하나의 파라미터를 받고 변환한 결과를 반환하기 때문에 이렇게 코드를 줄일 수 있습니다:

```javascript
get('story.json').then(JSON.parse).then(function(response) {
  console.log("Yey JSON!", response);
});
```

이를 아얘 함수로 만들어서 사용할 수도 있습니다:

```javascript
function getJSON(url) {
  return get(url).then(json.parse);
}
```

하지만 `getJSON()`이 JSON 객체가 아니라 promise 객체를 반환한다는 걸 주의해야 합니다.

### Queuing asynchronous actions

체이닝된 `then()` 콜백에서 뭔가를 반환하면, 다음 `then()`이 그 반환값을 가지고 호출됩니다. 하지만 만약 promise-like한 무언가를 반환하면 다음 then()은 이 promise-like한 무언가가 settled(fulfilled 또는 rejected) 상태가 될 때까지 기다립니다:

```javascript
getJSON('story.json').then(function(story) {
  return getJSON(story.chapterUrls[0]);
}).then(function(chapter1) {
  console.log("Got chapter 1!", chapter1);
});
```

## Error handling

catch()는 then(undefined, func)의 synthetic sugar입니다.

```javascript
asyncThing1().then(function() {
  return asyncThing2();
}).then(function() {
  return asyncThing3();
}).catch(function(err) {
  return asyncRecovery1();
}).then(function() {
  return asyncThing4();
}, function(err) {
  return asyncRecovery2();
}).catch(function(err) {
  console.log("Don't worry about it");
}).then(function() {
  console.log("All done!");
});
```

위 코드가 정확히 어떻게 동작하는지 flowcharts로 꼭 확인해보십시오: [Error handling | JavaScript Promises: an Introduction](https://developers.google.com/web/fundamentals/primers/promises#error_handling)

### JavaScript exceptions and promises

Rejection은 promise가 rejected될 때에 발생하기도 하지만, 생성자 콜백이나 `then()`에서 오류가 있을 때에도 발생합니다. 이러한 오류들에 대해서도  reject에서 처리할 수 있도록 구현해야 합니다.

### Error handling in practice

```javascript
getJSON('story.json').then(function(story) {
  return getJSON(story.chapterUrls[0]);
}).then(function(chapter1) {
  addHtmlToPage(chapter1.html);
}).catch(function() {
  addTextToPage("Failed to show chapter");
}).then(function() {
  document.querySelector('.spinner').style.display = 'none';
})
```

## Parallelism and sequencing: getting the best of both

비동기적으로 생각하는 것은 쉽지 않습니다. 이에 어려움을 겪고 있다면, 마치 동기적인 것처럼 코드를 작성하십시오:

```javascript
try {
  var story = getJSONSync('story.json');
  addHtmlToPage(story.heading);
  
  story.chapterUrls.forEach(function(chapterUrl) {
    var chapter = getJSONSync(chapterUrl);
    addHtmlToPage(chapter.html);
  })
  
  addTextToPage('All done');
}
catch (err) {
  addTextToPage('Argh, broken: ' + err.message);
}

document.querySelector('.spinner').style.display = 'none';
```

위 코드는 잘 동작합니다. 하지만 모든 컨텐츠가 다운로드될 때까지 아무 것도 표시하지 않습니다. then()을 사용해서 하나씩 진행되게 만들어봅시다:

```javascript
getJSON('story.json').then(function(story) {
  addHtmlToPage(story.heading);
  story.chapterUrls.forEach(function(chapterUrl) {
    getJSON(chapterUrl).then(function(chapter) {
      addHtmlToPage(chapter.html);
    });
  });
}).then(function(story) {
	addTextToPage('All done');
}).catch(function(err) {
  addTextToPage('Argh, broken: ' + err.message);
}).then(function() {
  document.querySelector('.spinner').style.display = 'none';
});
```

하지만 위 코드는 실패합니다. `forEach` 함수는 비동기적인 함수가 아니기 때문입니다.

### Creating a sequence

`chapterUrls`를 하나의 promise 시퀀스로 만드려면 `then()`을 사용하면 됩니다:

```javascript
return story.chapterUrls.reduce(function(sequence, chapterUrl) {
  // Once the last chapter's promise is done…
  return sequence.then(function() {
    // …fetch the next chapter
    return getJSON(chapterUrl);
  }).then(function(chapter) {
    // and add it to the page
    addHtmlToPage(chapter.html);
  });
}, Promise.resolve());
```

> `Promise.resolve()`는 덧셈에서의 0과 같이 promise에서 최초의 체이닝 시작점 역할을 할 수 있다.
>
> - Promise.resolve() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

하지만 위와 같이 사용하면 한 번에 하나의 챕터 내용만 다운로드하기 때문에 성능 저하가 발생합니다. 한번에 다운로드해봅시다:

```javascript
// Take an array of promises and wait on them all
return Promise.all(
  // Map our array of chapter urls to
  // an array of chapter json promises
  story.chapterUrls.map(getJSON);
);
```

여기서 조금 더 개선할 수 있습니다. 사용자는 챕터를 순서대로 읽을 것입니다. 한꺼번에 JSON을 가져오되, 챕터 순서대로 불러오도록 합니다:

```javascript
// Map our array of chapter urls to
// an array of chapter json promises.
// This makes sure they all download in parallel.
return story.chapterUrls.map(getJSON)
  .reduce(function(sequence, chapterPromise) {
  // Use reduce to chain the promises together,
  // adding content to the page for each chapter
  return sequence.then(function() {
    // Wait for everything in the sequence so far,
    // then wait for this chapter to arrive.
    return chapterPromise;
  }).then(function(chapter) {
    addHtmlToPage(chapter.html);
  });
}, Promise.resolve());
```

>  ES6 generator와 관련된 내용은 생략한다.

