# Classes

## Classes

```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

## Inheritance

- 생성자 함수에서 `this` 에 접근하려면 반드시 `super()` 를 호출해야 한다.

## Public, private, and protected modifiers

> protected: 선언된 클래스와 extend 클래스에서 접근 가능한 속성

- 기본적으로 member는 public이다.
- private로 선언하면 클래스 외부에서는 접근할 수 없다.
- TypeScript에서 두 타입의 멤버가 모두 호환되면, 두 타입이 호환된다고 한다.
- 하지만 만약 private 또는 protected 멤버가 있다면, 같은 선언으로부터 파생된 private 또는 protected 멤버를 갖고 있어야 호환된다고 한다.

```typescript
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // Error: 'Animal' and 'Employee' are not compatible
```

- protected 멤버는 extends 클래스에서 선언한 private처럼 extends 클래스에서 사용할 수 있고, 인스턴스에서는 직접 접근할 수 없다.
- constructor 또한 protected로 선언할 수 있다.

```typescript
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // error
```

- readonly 키워드를 사용할 경우 const와 같이 선언 시에 초기화, 할당되어야 한다.

## parameter property

- parameter property를 사용하면 멤버를 한 곳에서 생성 및 초기화할 수 있다.

```typescript
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {
    }
}
```

## Static Properties

```typescript
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}
```

## Abstract Classes

```typescript
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log("roaming the earth...");
    }
}
```

- 클래스를 인터페이스로 사용할 수 있다.

```typescript
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

