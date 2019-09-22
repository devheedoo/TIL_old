# MobX (1) 시작하기

https://velog.io/@velopert/MobX-1-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-9sjltans3p

## 1-1. MobX의 주요 개념들

1. Observable State
2. Computed Value
3. Reactions
4. Actions

## 1-2. 리액트 없이 MobX 사용해보기

[Edit on CodeSandbox](https://codesandbox.io/s/jl12r55265)

- oberservable 함수는 Observable State를 만들어줍니다.
- reaction: Observable State가 바뀔 때 작업을 수행합니다.
- computed: Observable State가 바뀔 때 함수를 수행하고 결과를 캐시에 저장합니다.
- autorun: reaction이나 computed의 observe 대신 사용할 수 있습니다. autorun으로 전달하는 함수 안에 Observable State가 있으면 값이 변경될 때마다 함수가 호출됩니다. 선언 시 최초에 한 번 호출됩니다. computed로 만든 값의 `.get()`을 호출하면 computed 연산 결과를 가져옵니다.

ES6 class 문법과 decorate 함수를 사용하면 코드가 아래와 같아집니다:

```javascript
import { decorate, observable, computed, autorun } from 'mobx';

class GS25 {
  basket = [];

  get total() {
    console.log('계산중입니다..!');
    // Reduce 함수로 배열 내부의 객체의 price 총합 계산
    return this.basket.reduce((prev, curr) => prev + curr.price, 0);
  }

  select(name, price) {
    this.basket.push({ name, price });
  }
}

// decorate 를 통해서 각 값에 MobX 함수 적용
decorate(GS25, {
  basket: observable,
  total: computed,
});

const gs25 = new GS25();
autorun(() => gs25.total);
gs25.select('물', 800);
console.log(gs25.total);
gs25.select('물', 800);
console.log(gs25.total);
gs25.select('포카칩', 1500);
console.log(gs25.total);
```

- action: Observable State를 변화시키는 작업입니다.
  - action을 사용하면 개발자 도구에서 세부 변화 정보를 볼 수 있습니다.
  - transaction을 이용해 변화를 일괄수행 후 reaction이 발생하게 할 수 있습니다.

```javascript
import {
  decorate,
  observable,
  computed,
  autorun,
  action,
  transaction
} from 'mobx';

class GS25 {
  basket = [];

  get total() {
    console.log('계산중입니다..!');
    // Reduce 함수로 배열 내부의 객체의 price 총합 계산
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    return this.basket.reduce((prev, curr) => prev + curr.price, 0);
  }

  select(name, price) {
    this.basket.push({ name, price });
  }
}

decorate(GS25, {
  basket: observable,
  total: computed,
  select: action
});

const gs25 = new GS25();
autorun(() => gs25.total);
// 새 데이터 추가 될 때 알림
autorun(() => {
  if (gs25.basket.length > 0) {
    console.log(gs25.basket[gs25.basket.length - 1]);
  }
});

// action을 모두 수행한 후 reaction이 실행됩니다. (성능 개선!)
transaction(() => {
  gs25.select('물', 800);
  gs25.select('물', 800);
  gs25.select('포카칩', 1500);
})

console.log(gs25.total);
```

- decorator 문법으로 더 편하게!: babel 플러그인을 통해 사용할 수 있는 문법입니다. `@observable`과 같이 코드를 작성할 수 있습니다.

