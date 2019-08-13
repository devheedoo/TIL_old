const fs = require('fs');

const readStream = fs.createReadStream('./writeme.txt', { highWaterMark: 16 });
const data = [];

readStream
.on('data', chunk => {
  data.push(chunk);
  console.log('data: ', chunk, chunk.length);
})
.on('end', () => {
  console.log('end: ', Buffer.concat(data).toString());
})
.on('error', err => {
  console.log('error: ', err);
});

