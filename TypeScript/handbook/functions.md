# Functions

## Functions

TypeScript 함수도 표현식, 익명 함수 모두 가능하다.

## Functions Types

```typescript
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return  x + y; };

// The parameters 'x' and 'y' have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

- 선택적 또는 디폴트 파라미터의 경우

```typescript
function buildName(firstName: string, lastName?: string) {
    // ...
}

function buildName(firstName: string, lastName = "Smith") {
    // ...
}
```

## this

TypeScript는 this의 잘못된 사용을 바로잡아준다.

> about JavaScript this: https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/

- `--noImplicitThis` 옵션을 사용하면 `this` 의 잘못된 사용에 대해 주의를 준다.

```typescript
// 변경 전
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

- `this.suits[pickedSuit]` 의 타입이 `any` 인 상태다. 타입을 설정해주려면 아래와 같이 변경한다:

```typescript
// 변경 후
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

- 콜백 함수에서의 `this` 는 컴파일 단계에서 파악할 수 없으므로 타이핑이 불가능하다.

## Overloads

- 한 함수가 여러 형태의 입/출력을 다루는 경우, 각 경우에 대한 함수 타입을 모두 나열해야 한다.

```typescript
let suits = ["hearts", "spades", "clubs", "diamonds"];

// 타이핑을 위해 추가된 두 함수
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };

function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

