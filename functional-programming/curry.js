const curry = f => (a, ...args) => args.length ? f(a, ...args) : (...args) => f(a, ...args);

module.exports.curry = curry;