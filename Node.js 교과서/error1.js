setInterval(() => {
  console.log('Start');
  try {
    throw new Error('Break your server.');
  } catch (err) {
    console.error(err);
  }
}, 1000);