# Interfaces

- TypeScript의 주요 원리 중 하나는 값들이 가진 모양에 초점을 맞춰 타입을 확인하는 것이다. 이는 "덕 타이핑", "구조적 서브타이핑"이라고도 부른다. TypeScript에서 **인터페이스**가 타입의 이름을 짓는 역할을 한다.

our first interface

```typescript
interface LabeledValue {
    label: string;
}

function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

optional properties

```typescript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.clor) {
        // Error: Property 'clor' does not exist on type 'SquareConfig'
        newSquare.color = config.clor;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
```

readonly properties

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20};
p1.x = 5;	// error!
```

변경 불가능한 배열인 `ReadonlyArray<T>` 도 있다:

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!

a = ro; // error!
a = ro as number[];	// OK
```

변수에는 `const` , 프로퍼티에는 `readonly` 를 사용하면 된다.

Excess Property Checks

인터페이스에서 설정하지 않은 프로퍼티로 객체를 생성하면 오류가 발생한다:

```typescript
// error: Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
let mySquare = createSquare({ colour: "red", width: 100 });
```

type assertion을 이용해 인터페이스에 없는 프로퍼티를 사용할 수 있다:

```typescript
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

또는 인터페이스에 이런 상황을 미리 정의할 수 있다:

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
```

또는 새 객체 변수를 만들어서 인자로 넘기는 것이다:

```typescript
let squareOption = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```

하지만 이 때에도 `SquareConfig` 와 공유하는 하나 이상의 프로퍼티가 있어야 한다.

Function Types

함수 타입에도 인터페이스를 사용할 수 있다:

```typescript
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

Indexable Types

```typescript
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

인덱스로 숫자나 문자열을 사용할 수 있다. 하지만 숫자는 문자열로 변환되어 호출되기 때문에 숫자 인덱스와 문자 인덱스의 값이 중복되지 않아야 한다.

프로퍼티의 타입을 설정할 수도 있다:

```typescript
interface NumberDictionary {
  [index: string]: number | string;	// 프로퍼티의 타입 설정
  length: number;
  name: string;
}
```

Class Types

```typescript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

인터페이스는 클래스의 public 데이터를 기술한다. 클래스의 인스턴스 부분만 확인한다는 의미다. static 부분은 직접 클래스 내부에서 기술해야 한다.

Difference between the static and instance sides of classes

```typescript
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

Extending interfaces

인터페이스도 서로 확장할 수 있다:

```typescript
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

Hybrid Types

인터페이스는 동시에 여러 타입이 될 수 있다:

```typescript
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = (function (start: number) { }) as Counter;
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

Interfaces Extending Classes

인터페이스가 클래스 타입을 확장하면 private와 protected 요소들까지 모두 상속받는다. 하지만 그들의 구현은 상속받지 않는다.

따라서 private와 protected 요소들은 해당 클래스나 바로 한 단계 아래 서브클래스에서만 구현될 수 있다.



extends, implements...