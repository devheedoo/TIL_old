# Type Checking JavaScript Files

*TypeScript 2.3 and later support type-checking and reporting errors in `.js` files with ``--checkJs`.*

- `// @ts-check` 주석으로 체크를 생략할 수 있다.
- 혹은 `--checkJs` 옵션을 제거하고, `// @ts-check` 주석을 달아서 그 부분만 체크할 수도 있다.
- 한 줄만 `// @ts-ignore` 주석으로 체크를 안 할 수도 있다.
- `tsconfig.json` 파일이 존재하면, JS 체크는 `noImplicityAny`, `strcitNullchecks` 등의 옵션을 기대할 것이다.

`.js` 파일에서는 `.ts` 파일과 비교해서 어떻게 다르게 체크하는지 알아보자.

## JSDoc types are used for type information

TypeScript처럼 `--noImplicitAny` 옵션을 사용하면 컴파일러가 추정할 수 없는 타입에 대해 에러를 발생시킨다.

선언문에 JSDoc 어노테이션을 작성하면 type 선언문처럼 동작한다:

```typescript
/** @type {number} */
var x;

x = 0;      // OK
x = false;  // Error: boolean is not assignable to number
```

## Properties are inferred from assignments in class bodies

ES2015에서는 클래스에서 프로퍼티를 선언할 수 없고 동적으로 할당만 가능하기 때문에 TypeScript에서는 다음과 같이 타입을 체크한다.

1. 생성자 함수에서 값을 할당한 경우, 할당한 값의 타입으로 체크한다.
2. 생성자 함수에서 값을 할당하지 않거나 `undefined`, `null` 로 할당한 경우, 이후 할당하는 모든 값의 타입을 타입 목록에 추가하면서 허용한다.

```typescript
class C {
    constructor() {
        this.constructorOnly = 0
        this.constructorUnknown = undefined
    }
    method() {
        this.constructorOnly = false // error, constructorOnly is a number
        this.constructorUnknown = "plunkbat" // ok, constructorUnknown is string | undefined
        this.methodOnly = 'ok'  // ok, but methodOnly could also be undefined
    }
    method2() {
        this.methodOnly = true  // also, ok, methodOnly's type is string | boolean | undefined
    }
}
```

만약 타입이 정해져있는데 생성자 함수 밖에서 값을 할당해야 한다면 JSDoc을 사용할 수 있다:

```typescript
class C {
    constructor() {
        /** @type {number | undefined} */
        this.prop = undefined;
        /** @type {number | undefined} */
        this.count;
    }
}

let c = new C();
c.prop = 0;          // OK
c.count = "string";  // Error: string is not assignable to number|undefined
```

## Constructor functions are equivalent to classes

ES2015 이전에는 JavaScript 생성자 함수가 클래스를 대신했다. 따라서 컴파일러도 이 패턴을 인식하여 클래스와 똑같이 생성자 함수를 체크한다.

```typescript
function C() {
    this.constructorOnly = 0
    this.constructorUnknown = undefined
}
C.prototype.method = function() {
    this.constructorOnly = false // error
    this.constructorUnknown = "plunkbat" // OK, the type is string | undefined
}
```

## CommonJS modules are supported

TypeScript는 `.js` 파일의 CommonJS 모듈 형식을 이해한다. `exports` 와 `module.exports` 는 export 선언으로 인식된다. 똑같이 `require` 함수 호출도 모듈 import 로 인식된다.

```typescript
// same as `import module "fs"`
const fs = require("fs");

// same as `export function readFile`
module.exports.readFile = function(f) {
    return fs.readFileSync(f);
}
```

## Classes, functions, and object literals are namespaces

아래는 모두 TypeScript에서 네임스페이스다.

```typescript
// 클래스
class C { }
C.D = class { }

// 함수
function Outer() { this.y = 2 }
Outer.Inner = function() { this.yy = 2 }

// 객체 리터럴
var ns = {}
ns.C = class { }
ns.func = function() { }

// IIFE
var ns = (function (n) {
  return n || {};
})();

// default to global
var assign = assign || function() { }
assign.extra = 1;
```

## Object literals are open-ended

`.ts` 파일에서는 객체 리터럴을 선언한 후에 멤버를 추가할 수 없다. 하지만 `.js` 파일에서는 open-ended 타입으로써 최초에 선언하지 않은 프로퍼티를 추가하고 조회할 수 있다. 제한하고 싶을 경우 JSDoc을 사용한다:

```typescript
var obj = { a: 1 };
obj.b = 2;	// Allowed

/** @type {{a: number}} */
var obj = { a: 1 };
obj.b = 2;	// Allowed
```

## null, undefined, and empty array initializers are of type any or any[]

null이나 undefined로 초기화된 변수, 인자, 프로퍼티는 any 타입을 갖는다. []로 초기화된 변수는 any[] 타입을 갖는다. 

## Function parameters are optional by default

ES2015 이전에는 JavaScript에서 파라미터를 선택적으로 설정할 수 없었기 때문에 `.js` 파일의 모든 함수 파라미터는 선택적인 것으로 간주한다. 허용된 파라미터 개수보다 적은 수의 인자는 선언될 수 있다.

너무 많은 인자를 사용하면 오류가 발생한다:

```typescript
function bar(a, b) {
    console.log(a + " " + b);
}
bar(1);				// OK, second argument considered optional
bar(1, 2);
bar(1, 2, 3);	// Error, too many arguments
```

JSDoc 으로 어노테이션은 함수는 이 규칙에서 예외다.

```typescript
/**
 * @param {string} [somebody] - Somebody's name.
 */
function sayHello(somebody) {
    if (!somebody) {
        somebody = 'John Doe';
    }
  console.log('Hello ' + somebody);
}
sayHello();
```

## Var-args parameter declaration inferred from use of `arguments`

body에 `arguments` 참조를 가진 함수는 var-arg 파라미터를 가진 것으로 인식한다. JSDoc의 var-arg 문법을 사용해서 `arguments` 의 타입을 설정할 수 있다.

```typescript
/** @param {...number} args */
function sum(/* numbers */) {
    var total = 0
    for (var i = 0; i < arguments.length; i++) {
      total += arguments[i]
    }
    return total
}
```

## Unspecified type parameters default to `any`

JavaScript에서는 일반 타입 파라미터을 가리키는 문법이 없기 때문에, 이러한 파라미터는 기본적으로 `any` 타입이 된다.

### In extends clause

`React.Component` 는 2개의 타입 파라미터, `Props`, `State` 와 함께 정의된다. 기본적으로 `any` 가 된다. JSDoc의 `@augments` 키워드를 사용해 타입을 정할 수 있다:

```javascript
import { Component } from "react';

/**
 * @augments {Component<{a: number}, State>}
 */
class MyComponent extends Component {
    render() {
        this.props.b;	// Error: b does not exist on {a:number}
    }
}
```

### In JSDoc references

JSDoc에서 설정하지 않은 인자의 타입은 `any` 이다.

```typescript
/** @type{Array} */
var x = [];

x.push(1);        // OK
x.push("string"); // OK, x is of type Array<any>

/** @type{Array.<number>} */
var y = [];

y.push(1);        // OK
y.push("string"); // Error, string is not assignable to number
```

## Supported JSDoc

아래 목록은 JavaScript 파일에서 체크 가능한 타입들을 사용하는 JSDoc 어노테이션들이다.

`@async` 와 같이 아래 목록에 없는 태그들은 아직 지원되지 않는다.

- `@type`
- `@param`, `@arg`, `@argument`
- `@returns`, `@return`
- `@typedef`
- `@callback`
- `@template`
- `@class`, `@constructor`
- `@this`
- `@extends`, `@augments`
- `@enum`

> JSDoc 예제
>
> ```javascript
> /**
>  * Represents a book.
>  * @constructor
>  * @param {string} title - The title of the book.
>  * @param {Array<number> | Object.<string, number>} author - The author of the book.
>  */
> function Book(title, author) {
> }
> 
> /** @type {(s: string, b: boolean) => number} Typescript syntax */
> var sbn2;
> /** @type {*} - can be 'any' type */
> var star;
> /** @type {?} - unknown type (same as 'any') */
> var question;
> ```

### Casts

TypeScript 는 클로저로부터 cast 문법을 빌려쓴다. 따라서 괄호로 감싼 표현식에 `@type` 태그를 붙여서 cast할 수 있다.

```javascript
/** @type {number | string} */
var numberOrString = Math.random() < 0.5 ? "hello" : 100;
var typeAssertedNumber = /** @type {number} */ (numberOrString);
```

### Import types

JSDoc 주석 안에서 import 할 수도 있다. alias도 된다:

```javascript
/** @param p { import"./a").Pet } Pet */
function walk(p) {
    console.log(`Walking ${p.name}...`);
}
```

타입을 모르는 모듈을 불러올 때도 유용하게 쓸 수 있다:

```javascript
/** @type {typeof import("./a").x} */
var x = require("./a").x;
```

## `@param` and `@returns`

`@param` 키워드는 파라미터명만 추가한 `@type` 문법과 같다. 파라미터가 선택적인 경우 파라미터명은 대괄호(`[]`)로 감싼다. 반환 타입은 `@return`, `@returns` 키워드를 사용한다:

```javascript
// Parameters may be declared in a variety of syntactic forms
/**
 * @param {string}  p1 - A string param.
 * @param {string=} p2 - An optional param (Closure syntax)
 * @param {string} [p3] - Another optional param (JSDoc syntax).
 * @param {string} [p4="test"] - An optional param with a default value
 * @return {string} This is the result
 */
function stringsStringStrings(p1, p2, p3, p4){
  // TODO
}

/**
 * @return {PromiseLike<string>}
 */
function ps(){}

/**
 * @returns {{ a: string, b: number }} - May use '@returns' as well as '@return'
 */
function ab(){}
```

## `@typedef`, `@callback`, `@param`

`@typedef` 는 복잡한 타입을 정의할 때 사용한다.

```javascript
/**
 * @typedef {Object} SpecialType - creates a new type named 'SpecialType' (or {object})
 * @property {string} prop1 - a string property of SpecialType
 * @property {number} prop2 - a number property of SpecialType
 * @property {number=} prop3 - an optional number property of SpecialType
 * @prop {number} [prop4] - an optional number property of SpecialType
 * @prop {number} [prop5=42] - an optional number property of SpecialType with default
 */
/** @type {SpecialType} */
var specialTypeObject;
```

`@param` 을 응용해서 `@typedef` 처럼 사용할 수도 있다:

```javascript
/**
 * @param {Object} options - The shape is the same as SpecialType above
 * @param {string} options.prop1
 * @param {number} options.prop2
 * @param {number=} options.prop3
 * @param {number} [options.prop4]
 * @param {number} [options.prop5=42]
 */
function special(options) {
  return (options.prop4 || 1001) + options.prop5;
}
```

## `@template`

`@template` 태그를 이용해 일반 타입을 선언할 수 있다:

```javascript
/**
 * @template T
 * @param {T} x - A generic parameter that flows through to the return type
 * @return {T}
 */
function id(x){ return x }
```

## `@constructor`

생성자 함수의 프로퍼티를 컴파일러가 똑똑하게 추정하긴 하지만, 더 정교하게 사용하기 위해 `@constructor` 태그를 이용해 타입을 설정해줄 수 있다.

```javascript
/**
 * @constructor
 * @param {number} data
 */
function C(data) {
  this.size = 0;
  this.initialize(data); // Should error, initializer expects a string
}
/**
 * @param {string} s
 */
C.prototype.initialize = function (s) {
  this.size = s.length
}

var c = new C(0);
var result = C(1); // C should only be called with new
```

## `@this`

컨텍스트를 갖고 있는 `this` 는 컴파일러가 타입을 추정할 수 있다. 그렇지 않은 경우, `@this` 태그를 이용해 타입을 정해줄 수 있다.

```javascript
/**
 * @this {HTMLElement}
 * @param {*} e
 */
function callbackForLater(e) {
    this.clientHeight = parseInt(e) // should be fine!
}
```

## `@extends`

JavaScript 클래스가 일반 base 클래스를 extend 할 때엔 타입 파라미터를 설정할 곳이 없다. 이 경우 `@extends` 태그를 사용해 타입 파라미터를 제공한다.

```javascript
/**
 * @template T
 * @extends {Set<T>}
 */
class SortableSet extends Set {
  // ...
}
```

## `@enum`

`@enum` 태그를 사용하면 특정 타입의 멤버만 허용하는 객체 리터럴을 만들 수 있다. `@enum` 의 타입은 어느 것이든 가능하다:

```javascript
/** @enum {number} */
const JSDocState = {
  BeginningOfLine: 0,
  SawAsterisk: 1,
  SavingComments: 2,
}

/** @enum {function(number): number} */
const Math = {
  add1: n => n + 1,
  id: n => -n,
  sub1: n => n - 1,
}
```

## More examples

(생략)





































































