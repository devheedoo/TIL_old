# 16 ECMAScript 6

> 출처: 자바스크립트 프로젝트북, 권대용, 한빛미디어

복습 내용이어서 키워드/예제 위주로 간단히 정리.

ECMAScript 6(이하 ES6)는 2015년 6월에 발표되었다. 브라우저 버전별 ES6 지원 여부는 https://caniuse.com/#feat=es6 에서 확인할 수 있다.

- Babel

- `let`, `const`

- arrow function, `this` 바인딩

- default parameter, rest parameter, spread operator

- 정의 방법:

    ```javascript
    let name = 'Heedo';
    let age = 27;
    let me = {
      name,
      age,
      info() {
        console.log('info');
      }
    }
    ```

- for-of 문

- template expression

- destructuring assignment:

    ```javascript
    let numbers = [1, 2, 3, 4];
    let [a, ...b] = numbers;
    console.log(a); // 1
    console.log(b); // [2, 3, 4]

    let book = {
      title: 'JavaScript',
      price: 25000
    };
    let { title, price } = book;
    let { title:newTitle, price:newPrice } = book;
    ```

- `class`:

    ```javascript
    class Book {
      constructor(title, author, price) {
        this.title = title;
        this.author = author;
        this.price = price;
      }
      info() {
        console.log(`${this.title}, ${this.author}`);
      }
    }
    ```

