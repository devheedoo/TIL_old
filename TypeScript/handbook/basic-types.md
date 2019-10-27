# Basic Types

`boolean`:

```typescript
let isDone: boolean = false;
```

`number`:

```typescript
let decimal: number = 6;
```

`string`:

```typescript
let color: string = "blue";
```

`array`:

```typescript
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

tuple:

- 여러 타입을 허용하는 배열이다.
- 타입이 지정된 인덱스까지는 순서에 맞는 타입의 값을 할당해야 한다.
- 타입이 지정되지 않은 이후의 인덱스에 대해서는 지정된 타입들 중 하나의 타입만 할당 가능하다.

```typescript
let x: [string, number] = ["hello", 10];
```

`enum`:

```typescript
enum Color {Red, Green, Blue}
```

`any`:

```typescript
let notSure: any = 4;
```

`Object`:

- `Object` 에는 어느 값이든 할당할 수 있다. 하지만 메소드를 호출할 수 없다.

```typescript
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```

`void`:

```typescript
function warnUser(): void {
  console.log("WARNING");
}
```

`null`, `undefined`:

```typescript
let u: undefined = undefined;
let n: null = null;
```

- 기본적으로 `null` 과 `undefined` 는 다른 모든 타입의 서브타입이다. 모든 타입에 할당할 수 있는 값이라는 의미다.
- `--strictNullChecks` 옵션을 사용하면 `null` 과 `undefined` 는 `any` , `null` , 그리고 `undefined` 에만 할당할 수 있다.

> 가능하면 `--strctNullChecks` 옵션을 사용하길 권장한다.

`never`:

- 발생하지 않을 값의 타입이다. 예를 들면, exception을 던지거나 반환 값이 없는 표현식이 있다.
- 모든 타입에 대해 참이 되지 않게 하려면 `never` 를 사용하면 된다.
- `never` 에는 어떤 타입도 할당할 수 없지만, 반대로 모든 타입에 `never` 를 할당할 수 있다.

```typescript
function error(message: string): never {
  throw new Error(message);
}

function fail(): never {
  return error("Somthing failed");
}

function inifiniteLoop(): never {
  while(true) {
    // ...
  }
}
```

again?, `object`:

- non-primitive 타입을 나타내는 타입이다.

```typescript
declare function create(o: object | null): void;
// OK
create({ prop: 0 });
create(null);
// Error
create(42);
create('string');
create(false);
create(undefined);
```

Type Assertions:

*"Hey, compiler. Trust me, I know what I’m doing.”*

- 기본 설정 타입 외에 필요한 타입 체크에 사용한다.
- 런타임 결과에는 영향을 미치지 않는다.

```typescript
let someValue: nay = "this is a string";
// 1. "angle-bracket" syntax
let strLength: number = (<string>someValue).length;
// 2. "as" syntax (TypeScript with JSX, it's the only option)
let strLength: numebr = (someValue as string).length;
```

