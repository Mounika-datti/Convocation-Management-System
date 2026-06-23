const http = require('http');

const testEmails = [
  'test1@example.com',
  'test2@example.com',
  'test3@example.com',
];

let completed = 0;

testEmails.forEach((email, idx) => {
  const postData = JSON.stringify({ email });

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

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`\\nTest ${idx + 1}: ${email}`);
      console.log('Status:', res.statusCode);
      console.log('Response:', data);
      
      completed++;
      if (completed === testEmails.length) {
        process.exit(0);
      }
    });
  });

  req.on('error', (e) => {
    console.error('Error:', e);
  });

  req.write(postData);
  req.end();
});
