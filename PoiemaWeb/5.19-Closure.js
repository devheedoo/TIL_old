/*
 * 출처: Closure | PoiemaWeb (https://poiemaweb.com/js-closure)
 */

/* 함수형 프로그래밍 */
// 새로 정의한 함수는 새 클로저를 사용하므로 각자의 counter 자유변수를 사용한다.
function makeCounter(counter) {
  var counter = 0;  // 자유 변수
  return function() {
    counter = predicate(counter);
    return counter;
  };
}

function increase(n) { return ++n; }
function decrease(n) { return --n; }

var increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

var decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2


/* 생성자 함수 */
// 하나의 객체 안에 있는 counter 자유변수를 두 메소드가 클로저로 공유한다.
function Counter() {
  var counter = 0;
  this.increase = function() { return ++counter; }
  this.decrease = function() { return --counter; }
}

var counter = new Counter();
console.log(counter.increase());  // 1
console.log(counter.decrease());  // 0
