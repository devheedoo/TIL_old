/*
 * 출처: 인사이드 자바스크립트, 송형주/고현준, 한빛미디어
 */

function countSeconds(howMany) {
  for (var i=1; i<=howMany; i++) {
    console.log(`for loop(${i}):`, new Date());
    setTimeout(function () {
      console.log(i);
    }, i*1000);
  }
}

// countSeconds(3);

function countSecondsClosure(howMany) {
  for (var i=1; i<=howMany; i++) {
    console.log(`for loop(${i}):`, new Date());
    (function (copyI) {
      console.log(`즉시실행함수(${copyI}):`, new Date());
      setTimeout(function () {
        console.log(copyI, new Date());
      }, copyI*1000);
    }(i))
  }
}

countSecondsClosure(3);