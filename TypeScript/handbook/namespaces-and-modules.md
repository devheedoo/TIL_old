# Namespaces and Modules

> TypeScript 1.5부터 내부 모듈은 "namespace", 외부 모듈은 "module"이라고 부른다.

## Using Namespaces

네임스페이스는 간단히 말해서 전역 네임스페이스 안의 자바스크립트 객체다. 의존성이 모두 `<script>` 태그 안에 포함될 경우, 네임스페이스를 사용하면 코드를 잘 구조화할 수 있다.

## Using Modules

모듈이 네임스페이스와 비교해서 가장 크게 다른 점은 의존성을 선언한다는 점이다.

또한 모듈은 모듈 로더에 의존성을 가진다. 앱 규모가 커질수록 이에 따른 영향이 커질 것이다.

ECMAScript2015와 함께 모듈은 언어에 포함됐다. 새로 시작하는 프로젝트에서는 코드 구조화에 모듈을 사용할 것을 강력히 추천한다.

## Pitfalls of Namespaces and Modules

네임스페이스와 모듈을 사용하면서 겪을 수 있는 위험들과 이를 피하는 방법에 대해 알아보자.

### `<reference>` -ing a module

`import` 가 아니라 `<reference ... />` 구문을 사용할 때 실수하기 쉽다.

컴파일러는 경로를 결정하기 위해 `.ts`, `.tsx` 파일을 찾아보고 나서 `.d.ts` 파일을 찾습니다. 특정 `.ts` 파일이 없으면 `.d.ts` 파일에서 ambient 모듈 선언을 찾습니다.

### Needless Namespacing

```typescript
// shapes.ts
export namespace Shapes {
    export class Triangle { /* ... */ }
    export class Square { /* ... */ }
}

// shapeConsumer.ts
import * as shapes from "./shapes";
let t = new shapes.Shapes.Triangle(); // shapes.Shapes?
```

네임스페이스를 사용하는 이유는 논리적으로 구조를 묶고, 이름 충돌을 방지하기 위한 것이다. 따라서 이미 논리적으로 구조화되어 있고, 이미 import 하는 부분에서 이름을 따로 정해서 사용하고 있다면 굳이 추가적인 모듈 층을 만들 필요가 없다.

위의 코드에서 쓸데없는 네임스페이스를 지우면 이렇다:

```typescript
// shpaes.ts
export class Triangle { /* ... */ }
export class Square { /* ... */ }

// shapeConsumer.ts
import * as shapes form "./shapes";
let t = new shapes.Triangle();
```

