// 노드의 파일 관련 모듈
const fs = require('fs');

// 파일 쓰기
fs.writeFile('./writeme.txt', '글이 입력됩니다.', (err) => {
  if (err) { throw err; }
  // 파일 읽기
  fs.readFile('./writeme.txt', (err, data) => {
    if (err) { throw err; }
    console.log(data.toString());
  });
});