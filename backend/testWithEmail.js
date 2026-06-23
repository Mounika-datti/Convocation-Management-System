const http = require('http');

const postData = JSON.stringify({ email: 'mounikadatti05@gmail.com' });

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/forgot-password',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
};

console.log('=== MAKING REQUEST FOR EXISTING EMAIL ===');
console.log('Time:', new Date().toISOString());
console.log('Email: mounikadatti05@gmail.com');
console.log('========================================\n');

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('RESPONSE STATUS:', res.statusCode);
    console.log('RESPONSE BODY:', data);
    try {
      const json = JSON.parse(data);
      console.log('\nParsed response:');
      console.log('  success:', json.success);
      console.log('  message:', json.message);
      console.log('  otp in response:', json.otp ? 'YES (bad!)' : 'NO (good!)');
    } catch (e) {
      console.log('Could not parse JSON');
    }
    console.log('\nWaiting 2 seconds...');
    setTimeout(() => {
      console.log('Test complete');
      process.exit(0);
    }, 2000);
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(postData);
req.end();
