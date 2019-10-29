# Namespaces

> TypeScript 1.5부터 내부 모듈은 "namespace", 외부 모듈은 "module"이라고 부른다.

## Introduction

만약 내부 모듈을 `module` 로 정의했다면 `namespace` 로 고쳐야 한다.

## First steps

간단한 문자열 유효성 검사 기능을 구현해보자. 웹페이지에서 사용자의 input 을 확인하거나 외부에서 제공된 데이터 파일의 형식을 확인할 것이다.

### Validators in a single file

(코드 생략)

### Namespacing

유효성 검사 종류가 늘어남에 따라 타입을 유지하면서 이름이 충돌할 걱정을 하지 않게 구조화 계획을 원할 것이다. 전역 네임스페이스에 수많은 이름들을 쓰지 말고, 객체를 네임스페이스로 감싸보자.

우리는 예제에서 모든 유효성 검사 관련 요소들을 `Validation` 이라는 네임스페이스로 옮길 것이다. 그리고 네임스페이스 바깥에서 사용할 수 있게 `export` 를 앞에 붙일 것이다. 반대로 몇몇 함수는 export 되지 않아서 외부에서 보이지 않게 할 것이다.

```typescript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
```

### Splitting Across Files

앱의 규모가 커지면 코드를 여러 개의 파일로 분리해야 유지보수에 용이하다.

#### Multi-file namespaces

##### Validation.ts

```ts
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
}
```

##### LettersOnlyValidator.ts

```ts
/// <reference path="Validation.ts" />
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}
```

##### ZipCodeValidator.ts

```ts
/// <reference path="Validation.ts" />
namespace Validation {
    const numberRegexp = /^[0-9]+$/;
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}
```

##### Test.ts

```typescript
/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}
```

`--outFile` 옵션을 사용하면 input file들이 JavaScirpt 파일로 생성된다. 직접 항목 하나하나를 입력할 수도 있다.

### Aliases

```typescript
namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as 'new Shapes.Polygons.Square()'
```

`require` 키워드를 사용하지 않고 직접 유효안 심볼명을 할당하는 것에 주목해라. 







































