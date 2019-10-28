# Generics

재사용성은 매우 중요하다. 다양한 타입에 대해 재사용가능하게 하는 도구를 generics라고 한다.

## Hello World of Generics

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

`T` 는 타입을 확인해서 그 정보를 사용할 수 있게 해주며, 이를 사용하면 generic하다고 한다. generic 함수를 호출하는 방법은 2가지다:

1. `identity<string>("myString");`
2. `identity("myString");`

두 번째 방법을 사용해도 타입을 추론할 수 있다. 대부분 두 번째 방법을 사용한다.

## Working with Generic Type Variables

인자의 길이를 알고 싶다면, 다음과 같이 사용할 수 있다:

```typescript
function loggingIdentity<T>(args: Array<T>): Array<T> {
  console.log(args.length);
  return arg;
}
```

## Generic Types

```typescript
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

## Generic Classes

숫자에 대한 Generic 클래스:

```typescript
class GenericAdder<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericAdder<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

문자열에 대한 Generic 클래스:

```typescript
let stringNumeric = new GenericAdder<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
```

Generic 클래스는 인스턴스에 대해서만 generic하기 때문에(?) static 멤버에 대해서는 클래스의 타입 파라미터를 사용할 수 없다.

## Generic Constraints

위에서 `.length` 프로퍼티를 사용하기 위해 배열로 바꾸었었다. 이를 인터페이스로 확장해서 다시 구현하면 다음과 같다:

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

const id1 = loggingIdentity(42);
```

### Using Type Parameters in Generic Constraints

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```

### Using Class Types in Generics

```typescript
function create<T>(c: {new(): T; }): T {
    return new c():
}
```

prototype property를 통해 추론해서 타이핑할 수도 있다:

```typescript
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!
```

