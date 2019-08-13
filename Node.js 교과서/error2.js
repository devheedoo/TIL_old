// uncaughtException 이벤트 리스너가 없으면
// Break your server 에러 로그 발생 후 서버가 다운된다.
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception Occurs.', err)
});

setInterval(() => {
  throw new Error('Break your server.');
}, 1000);

setTimeout(() => {
  console.log('Reached Here')
}, 2000);