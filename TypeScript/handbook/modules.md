# Modules

> ECMAScript 2015와 맞추기 위해 기존 용어가 일부 변경됐다:
>
> - internal modules > namepsaces
> - external modules > modules

모듈은 각자 고유한 스코프를 갖는다. 변수, 함수, 클래스 등이 전역 스코프가 아니라 모듈 내에서만 정의된다는 것이다. 외부 모듈에서 사용하려면 `export` 양식을 사용해야 한다. 반대로, export한 모듈을 사용하려면 `import` 양식을 사용해야 한다.

import 동작은 모듈 로더를 이용한다. 잘 알려진 모듈 로더는 CommonJS 모듈을 위한 Node.js의 로더와, AMD 모듈을 위한 RequireJS 로더가 있다.

최상위 레벨 `import` 또는 `export` 가 있으면 모듈로 인식하고, 없으면 전역 스코프로 여긴다.

## Export

모든 선언은 `export` 키워드로 export 할 수 있다.

```typescript
// export
export interface StringValidator {
    isAcceptable(s: string): boolean;
}

// statements
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };

// Re-exports
export { ZipCodeValidator as RegExpBasedZipCodeValidator } from "./ZipCodeValidator";
```

`export * from "module"` 구문을 이용해 다른 모듈을 감싸서 한꺼번에 export 할 수도 있다.

## Import

`import` 양식을 사용해 export 된 모듈을 간단히 import 할 수 있다.

```typescript
import { ZipCodeValidator } from "./ZipCodeValidator";
let myValidator = new ZipCodeValidator();

// renamed
import { ZipCodeValidator as ZCV} from "./ZipCodeValidator";
let myValidator = new ZCV();

// entire module into a single variable
import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();
```

권장하진 않지만, 전역으로 모듈을 export 해서 사용할 때는 해당 모듈에서 `export` 를 쓰지 않고 아래와 같이 import 한다:

```typescript
import "./my-module.js";
```

## Default Exports

각각의 모듈은 `default` export 를 할 수 있다. 하나의 모듈에서 하나의 `default` export 만 가능하다.

```typescript
// export
declare let $: JQuery;
export default $;

// import
import $ from "jquery";
$("button.continue").html( "Next Step..." );
```

선언에서 직접 default export 할 수도 있다.

```typescript
export default class ZipCodeValidator {
    static numberRegexp = /^[0-9]+$/;
    isAcceptable(s: string) {
        return s.length === 5 && ZipCodeValidator.numberRegexp.test(s);
    }
}
```

## `export = ` and `import = require()`

CommonJS와 AMD 모두 `exports` 개념을 갖고 있다. 이는 모듈의 모든 export 를 포함하는 것이다.

`exports` 객체를 커스텀 단일 객체로 대체할 수도 있고, default exports 는 이렇게 대체하는 방식 중 하나다. 하지만 둘은 비교불가능하다. TypeScript는 전통적인 CommonJS와 AMD에서 사용하는 `export =` 를 지원한다.

`export = "module"` 문법을 사용하면, `import module = require("module")` 문법으로 import 해야 한다.

```typescript
// export
let numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
export = ZipCodeValidator;

// import
import zip = require("./ZipCodeValidator");
```

Code Generation for Modules

(어렵다)

## Simple Example

컴파일하려면 반드시 모듈 타겟을 명령어에 지정해줘야 한다. Node.js 에서는 `--module commonjg` , require.js 에서는 `--module amd` 를 사용한다.

## Optional Module Loading and Other Advanced Loading Scenarios

종종 특정 조건에서만 모듈을 불러와야 할 때가 있다. 아래 패턴을 이용하면 가능하다. 이 외에도 타입 안정성을 잃지 않고 다양하게 불러오는 경우들을 볼 수 있다.

컴파일러는 생성된 JavaScript 파일에서 각 모듈이 사용되는지 탐지한다. 모듈이 사용되지 않으면 그 모듈에 대한 `require` 호출이 JavaScript로 생성되지 않는다. 사용되지 않는 참조를 생략하기 때문에 성능 최적화에 좋고, 조건적으로 모듈을 불러올 수 있게 한다.

다만 이렇게 동작하기 위해선 `import` 에 의해 정의된 심볼을 타입 위치에만 사용해야 한다. 컴파일 결과 JavaScript 파일에 남아선 안 된다.

```typescript
declare function require(moduleName: string): any;

import { ZipCodeValidator as Zip } from "./ZipCodeValidator";

if (needZipValidation) {
    let ZipCodeValidator: typeof Zip = require("./ZipCodeValidator");
    let validator = new ZipCodeValidator();
    if (validator.isAcceptable("...")) { /* ... */ }
}
```

## Working with Other JavaScript Libraries

TypeScript에 적혀있지 않은 타입의 라이브러리를 기술하기 위해 API를 선언할 필요가 있다.

구현을 정의하지 않은 선언에 대해 "ambient"라고 한다. 일반적으로 ambient 들은 `.d.ts` 파일에 정의되어 있다.

### Ambient Modules

파일별로 `.d.ts` 파일을 만들 수도 있지만, 한꺼번에 하나의 큰 `.d.ts` 파일로 작성하는 것이 편하다.

node.d.ts 파일을 일부 발췌한 것이다:

```typescript
declare module "url" {
    export interface Url {
        protocol?: string;
        hostname?: string;
        pathname?: string;
    }

    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}

declare module "path" {
    export function normalize(p: string): string;
    export function join(...paths: any[]): string;
    export var sep: string;
}
```

## Guidance for structuring modules

### Export as close to top-level as possible

모듈을 설계할 때는 너무 많은 단계가 생기지 않도록 주의해야 한다.

만약 하나의 클래스나 함수를 export 한다면, `export default` 를 사용해라. import 하는 사용자는 원하는대로 네이밍할 수 있고, 불필요하게 점을 찍지 않아도 된다.

```typescript
import t from "./MyClass";
import f from "./MyFunc";
let x = new t();
console.log(f());
```

만약 여러 객체를 export 한다면, 모두를 최상위 단계에 둬라. 

```typescript
import { SomeType, someFunc } from "./MyThings";
let x = new SomeType();
let y = someFunc();
```

많은 수의 것들을 import 한다면, namespace import 패턴을 사용해라.

```typescript
import * as myLargeModule from "./MyLargeModule.ts";
let x = new myLargeModule.Dog();
```

### Re-export to extend

모듈 기능을 확장할 때는 기존 객체를 변경하지 않고, 새로운 요소를 export 한다. 기존 Calculator 를 그대로 사용하면서 기능을 추가한 코드 예시이다:

```typescript
import { Calculator } from "./Calculator";

class ProgrammerCalculator extends Calculator {
    static digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

    constructor(public base: number) {
        super();
        const maxBase = ProgrammerCalculator.digits.length;
        if (base <= 0 || base > maxBase) {
            throw new Error(`base has to be within 0 to ${maxBase} inclusive.`);
        }
    }

    protected processDigit(digit: string, currentValue: number) {
        if (ProgrammerCalculator.digits.indexOf(digit) >= 0) {
            return currentValue * this.base + ProgrammerCalculator.digits.indexOf(digit);
        }
    }
}

// Export the new extended calculator as Calculator
export { ProgrammerCalculator as Calculator };

// Also, export the helper function
export { test } from "./Calculator";
```

### Do not use namespaces in modules

(아직 네임스페이스를 안 봐서 이해가 안 간다.)

