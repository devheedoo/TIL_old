const EventEmitter = require('events');

const myEvent = new EventEmitter();

myEvent.addListener('event1', () => {
  console.log('Event 1');
});

myEvent.on('event2', () => {
  console.log('Event 2');
});
myEvent.on('event2', () => {
  console.log('Event 2 Addition');
});

myEvent.emit('event1');
myEvent.emit('event2');

myEvent.on('event3', () => {
  console.log('Event 3');
});

myEvent.emit('event3');
myEvent.emit('event3');

myEvent.on('event4', () => {
  console.log('Event 4');
});

myEvent.removeAllListeners('event4');
myEvent.emit('event4');

const listener = () => {
  console.log('Event 5');
}
myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5');

console.log(myEvent.listenerCount('event2'));