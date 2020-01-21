const {curry} = require('./curry');
const {map, filter, reduce} = require('./map-filter-reduce-curried');
const {go, pipe} = require('./go-pipe');
const {test} = require('./test');

// Lazy Object
const L = {}

// range
const range = l => {
  const res = [];
  let i = -1;
  while (++i < l) {
    res.push(i);
  }
  return res;
}
// test([0, 1, 2, 3], range(4));

L.range = function *(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
}
// test([0, 1, 2, 3], L.range(4)); // [object Generator]
// test([0, 1, 2, 3], map(a => a, L.range(4)));

L.map = curry(function *(f, iter) {
  for (const a of iter) yield f(a);
});

L.filter = curry(function *(f, iter) {
  for (const a of iter) if (f(a)) yield a;
});

const take = curry((l, iter) => {
  const res = [];
  // console.log(iter);
  for (const a of iter) {
    if (res.length < l) res.push(a);
  }
  return res;
});
// test([1, 3, 5], take(3, [1, 3, 5, 7, 9]));

console.log(Date.now().toString());
test(
  [5, 10, 15],
  go([1, 2, 3, 4, 5],
    map(a => a * 5),
    take(3)
  )
);
console.log(Date.now().toString());
test(
  [5, 10, 15],
  go([1, 2, 3, 4, 5],
    L.map(a => a * 5),
    take(3)
  )
);
console.log(Date.now().toString());