// Map

const { Map, fromJS } = Immutable;

const data = fromJS({
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
    f: 5
  }
});

// console.log(data);

const deserialized = data.toJS();
console.log(deserialized);

console.log(data.get('a'));

console.log(data.getIn(['c', 'd']));

const newData = data.setIn(['c', 'd'], 10);
console.log(newData.toJS());

const newData2 = data.mergeIn(['c'], { d: 10, e: 10 });
console.log(newData2.toJS());

const newData3 = data.merge({ a: 10, b: 10 });
console.log(newData3.toJS());


// List

const { List } = Immutable;

const list0 = List([0, 1, 2, 3, 4]);

const list1 = List([
  Map({ value: 1}),
  Map({ value: 2})
]);

const list2 = fromJS([
  { value: 1 },
  { value: 2 }
]);

console.log(list1.toJS());

console.log(list1.getIn([0, 'value']));

const newList1 = list1.set(0, Map({ value: 10}));
console.log(newList1.toJS());

const newList2 = list1.setIn([0, 'value'], 11);
console.log(newList2.toJS());

const newList3 = list1.update(0, item => item.set('value', item.get('value') * 5));
console.log(newList3.toJS());

const newList4 = list1.push(Map({ value: 3 })); // list1.unshift()
console.log(newList4.toJS());

const newList5 = list1.delete(1); // list1.pop()
console.log(newList5.toJS());

console.log(list1.size);

console.log(list1.isEmpty());
