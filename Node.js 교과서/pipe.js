const fs = require('fs');

const readStream = fs.createReadStream('./writeme.txt');
const writeStream = fs.createWriteStream('./writeme_copy.txt');
readStream.pipe(writeStream);