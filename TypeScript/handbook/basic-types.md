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

tuple - [TYPE, TYPE, ...]:

> What is exactly tuple?

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

- `Object` only allow you to assign any value to them.
- You can't call arbitrary methods on them, even ones that actually exist.

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

- By default `null` and `undefined` are subtypes of all other types. That means you can assign `null` and `undefined` to something like `number`.
- when using `--strictNullChecks` flag, `null` and `undefined` are only assignable to `any`, `null`, and `undefined`.

> We encourage the use of `--strictNullChecks` when possible.

`never`:

- Represents the type of values that never occur.
- function expression that always throws an exception
- function expression that never returns
- any type guards that can never be true
- subtype of, and assignable to, every type
- no type is subtype of, or assignable to, `never`

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

- special checks that you need
- no runtime impact

```typescript
let someValue: nay = "this is a string";
// 1. "angle-bracket" syntax
let strLength: number = (<string>someValue).length;
// 2. "as" syntax (TypeScript with JSX, it's the only option)
let strLength: numebr = (someValue as string).length;
```

