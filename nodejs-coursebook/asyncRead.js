// fs 모듈의 동기 메서드
const fs = require('fs');

console.log('시작');
// ./writeme.txt 파일을 n번 읽기
const readFileNTimes = n => {
  for (let readFileIter=0; readFileIter<n; readFileIter++) {
    fs.readFile('./writeme.txt', (err, data) => {
      if (err) { throw err; }
      console.log(readFileIter + '번', data.toString());
    });
  }
}
readFileNTimes(5);
console.log('끝');

// 동기와 비동기는 함수가 바로 return되는지 여부
// 블로킹과 논블로킹은 백그라운드 작업 완료 여부