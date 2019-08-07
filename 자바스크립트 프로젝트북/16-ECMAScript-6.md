## 16 ECMAScript 6

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

