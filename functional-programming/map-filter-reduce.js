const map = (f, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
}

const filter = (f, iter) => {
  const res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
}

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
}

// TEST
const test = require('./test');
test([2, 4, 6, 8], map(a => a * 2, [1, 2, 3, 4]));
test([1, 2], filter(a => a < 3, [1, 2, 3, 4]));
test(15, reduce((a, b) => a + b, 0, [1, 2, 3, 4, 5]));
test(10, reduce((a, b) => a + b, [1, 2, 3, 4]));