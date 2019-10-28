# Type Compatibility

> compatible은 서로 할당가능한 타입이라는 말이다. (= assignable)

TypeScript에서의 타입 비교는 structural subtyping에 기초한다. 비교할 대상들의 멤버를 비교하는 것이다. 이는 nominal typing과 반대되는 개념이다.

```typescript
interface Named {
    name: string;
}

class Person {
    name: string;
}

let p: Named;
p = new Person():	// OK
```

**Notes:** TypeScript의 몇몇 명령어는 안전성 여부를 컴파일 전에 알 수 없다. 이를 "sound"하지 못하다고 표현한다.

## Starting out

기본 규칙은 이렇다:

" `y` 가 적어도 `x` 의 멤버들을 똑같이 모두 가지고 있을 때, `x` 는 `y` 와 compatible하다." (단방향)

이 규칙은 하위 멤버까지 재귀적으로 적용된다.

## Comparing two functions

함수의 경우 compatible 판정이 더 어렵다.

```typescript
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```

파라미터를 포함하면 compatible하다. (파라미터를 줄이는 건 괜찮다.)

```typescript
let x = () => ({name: "Alice"});
let y = () => ({name: "Alice", location: "Seattle"});

x = y; // OK
y = x; // Error, because x() lacks a location property
```

반환 값의 프로퍼티가 포함되면 compatible하다. (파라미터가 늘어나는 건 괜찮다.)

### Function Parameter Bivariance

(이해 안 됨)

## Enums

Enum values from different enum types are incompatible.

## Classes

Static members and constructors do not affect compatibility.

## Generics

(이해 안 됨)

TypeScript는 structural 타입 시스템이기 때문에 결과 타입에 따라 compatibility가 결정된다.

```typescript
interface Empty<T> {
}
let x: Empty<number>;
let y: Empty<string>;
x = y;  // OK, because y matches structure of x

interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;
x = y;  // Error, because x and y are not compatible

let identity = function<T>(x: T): T {
    // ...
}
let reverse = function<U>(y: U): U {
    // ...
}
identity = reverse;  // OK, because (x: any) => any matches (y: any) => any
```

