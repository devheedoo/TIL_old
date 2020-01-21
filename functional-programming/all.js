
// curry
const curry = f => (a, ...args) => args.length ? f(a, ...args) : (...args) => f(a, ...args);

const takeAll = take(Infinity);

// map
const map = curry(pipe(L.map, takeAll));

// filter
const filter = curry(pipe(L.filter, takeAll));

// reduce
const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

// go
const go = (...args) => reduce((a, f) => f(a), args);

// pipe
const pipe = (...fs) => a => go(a, ...fs);

// range
const range = l => {
  const res = [];
  let i = -1;
  while (++i < l) {
    res.push(i);
  }
  return res;
}

// lazy object
const L = {}

// lazy range
L.range = function *(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
}

// lazy map
L.map = curry(function *(f, iter) {
  for (const a of iter) yield f(a);
});

// lazy filter
L.filter = curry(function *(f, iter) {
  for (const a of iter) if (f(a)) yield a;
});

// take
const take = curry((l, iter) => {
  const res = [];
  // console.log(iter);
  for (const a of iter) {
    if (res.length < l) res.push(a);
  }
  return res;
});

const isIterable = a => a && a[Symbol.iterator];

L.flatten = function *(iter) {
  for (const a of iter) {
    if (isIterable(a)) for (const b of a) yield b;
    else yield a;
  }
}

const flatten = pipe(L.flatten, take(Infinity));

// time test
function timetest(name, repeats, f) {
  console.time(name);
  while(repeats--) f();
  console.timeEnd(name);
}

// timetest('take', 10, () => go([1, 2, 3, 4, 5],
//     map(a => a * 5),
//     take(3)
//   )
// );

// timetest('take-lazy', 10, () => go([1, 2, 3, 4, 5],
//     L.map(a => a * 5),
//     take(3)
//   )
// );

// timetest('take-lazy-one', 10, () => go([1, 2, 3, 4, 5],
//     L.map(a => a * 5),
//     take(1)
//   )
// );