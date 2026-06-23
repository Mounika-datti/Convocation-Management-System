const http = require('http');

const postData = JSON.stringify({ email: 'testuser@example.com' });

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

console.log('=== MAKING REQUEST ===');
console.log('Time:', new Date().toISOString());
console.log('Email: testuser@example.com');
console.log('========================\n');

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('RESPONSE STATUS:', res.statusCode);
    console.log('RESPONSE BODY:', data);
    console.log('\nWaiting 2 seconds for backend logs...');
    setTimeout(() => {
      console.log('Test complete. Check backend terminal for logs.');
      process.exit(0);
    }, 2000);
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(postData);
req.end();
