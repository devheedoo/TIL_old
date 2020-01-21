const {map, filter, reduce} = require('./map-filter-reduce-curried');
const {test} = require('./test');

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (...fs) => a => go(a, ...fs);

module.exports.go = go;
module.exports.pipe = pipe;

// test(
//   20,
//   go([1, 2, 3, 4, 5],
//     map(a => a * 2),
//     filter(a => a < 10),
//     reduce((a, b) => a + b)
//   )
// );

// test(
//   20,
//   pipe(
//     map(a => a * 2),
//     filter(a => a < 10),
//     reduce((a, b) => a + b)
//   )([1, 2, 3, 4, 5])
// );
