# Declaration Merging

**NOTE:** 기존의 JavaScript와 연계할 때 도움이 될 개념이다.

"declaration merging"이란 컴파일러가 같은 이름의 두 선언을 하나의 정의로 합치는 것이다. 합쳐진 새 정의는 기존 선언들의 특징들을 모두 가지며, 합칠 수 있는 선언들의 개수에는 제한이 없다.

## Basic Concepts

선언(declaration)은 적어도 셋 중에 하나 이상에 해당하는 요소를 만든다:

- 네임스페이스
- 타입
- 값

선언으로 만들어지는 종류는 7가지다: Namespace, Class, Enum, Interface, Type Alias, Function, Variable.

## Merging Interfaces

가장 흔한 경우는 인터페이스 간 융합이다. 기본적으로 인터페이스들의 멤버를 모두 포함한다:

```typescript
interface Box {
    height: number;
    width: number;
}
interface Box {
    scale: number;
}

let box: Box = {height: 5, width: 6, scale: 10};
```

만약 함수가 아니면서 중복되는 이름을 가진 멤버의 타입이 다르면 컴파일 오류가 발생한다. 함수인데 이름이 중복될 경우 나중에 합쳐지는 인터페이스의 함수로 overload 된다. 아래의 세 인터페이스는 하나의 인터페이스로 합쳐진다:

```typescript
interface Cloner {
  clone(animal: Animal): Animal;
}
interface Cloner {
  clone(animal: Sheep): Sheep;
}
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

// after merging
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}
```

한 가지 예외가 있다. 만약 타입이 하나의 문자열 리터럴일 경우엔 overload 목록의 최상단으로 올라간다:

```typescript
interface Document {
    createElement(tagName: any): Element;
}
interface Document {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
    createElement(tagName: string): HTMLElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
}

// after merging
interface Document {
    createElement(tagName: "canvas"): HTMLCanvasElement;
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: string): HTMLElement;
    createElement(tagName: any): Element;
}
```

## Merging Namespaces

각 네임스페이스의 내부에서 export 한 인터페이스의 경우, 위에서 본 규칙대로 합쳐진다.

인터페이스 외의 값들은 나중에 합쳐지는 네임스페이스의 멤버들이 뒷쪽으로 추가된다.

export 하지 않은 멤버의 경우 merge 과정에서 사라진다. export 한 함수에서 export 하지 않은 변수를 사용할 경우, merge 처리가 되었더라도 변수가 없어지기 때문에 오류가 발생한다.

## Merging Namespaces with Classes, Functions, and Enums

### Merging Namespaces with Classes

```typescript
// 1
class Album {
    label: Album.AlbumLabel;
}
namespace Album {
    export class AlbumLabel { }
}

// 2
function buildLabel(name: string): string {
    return buildLabel.prefix + name + buildLabel.suffix;
}
namespace buildLabel {
    export let suffix = "";
    export let prefix = "Hello, ";
}
console.log(buildLabel("Sam Smith"));

// 3
enum Color {
    red = 1,
    green = 2,
    blue = 4
}

namespace Color {
    export function mixColor(colorName: string) {
        if (colorName == "yellow") {
            return Color.red + Color.green;
        }
        else if (colorName == "white") {
            return Color.red + Color.green + Color.blue;
        }
        else if (colorName == "magenta") {
            return Color.red + Color.blue;
        }
        else if (colorName == "cyan") {
            return Color.green + Color.blue;
        }
    }
}
```

## Disallowed Merges

클래스는 다른 클래스나 변수들과 merge 할 수 없다. merge 를 따라하는 방법이 있긴 하다.

- [Mixins in TypeScript](https://www.typescriptlang.org/docs/handbook/mixins.html)

## Module Augmentation

JavaScript 모듈이 merge 를 지원하진 않지만, import 후에 업데이트할 수 있다:

```typescript
// map.ts
import { Observable } from "./observable";
Observable.prototype.map = function (f) {
    // ... another exercise for the reader
}
```

```typescript
// observable.ts
export class Observable<T> {
    // ... implementation left as an exercise for the reader ...
}

// map.ts
import { Observable } from "./observable";
declare module "./observable" {
    interface Observable<T> {
        map<U>(f: (x: T) => U): Observable<U>;
    }
}

Observable.prototype.map = function (f) {
    // ... another exercise for the reader
}

// consumer.ts
import { Observable } from "./observable";	// Is it necessary?
import "./map";
let o: Observable<number>;
o.map(x => x.toFixed());
```

하지만 이 방식에서는 한계가 2가지 있다:

1. 최상단에 새로 선언할 수 없다. 기존 선언을 수정할 수 있을 뿐이다.
2. default export 를 사용할 경우 변경할 수 없다.

> ? declare 키워드

## Global augmentation

전역 스코프에서 추가로 선언할 수도 있다:

```typescript
declare global {
    interface Array<T> {
        toObservable(): Observable<T>;
    }
}
```

