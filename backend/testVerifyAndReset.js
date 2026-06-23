const http = require('http');

const testEmail = 'mounikadatti05@gmail.com';
const recentOTP = '784679'; // From backend logs

// Step 2: Verify OTP
function step2VerifyOTP(otp) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({ 
      email: testEmail, 
      otp: otp 
    });
    
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/verify-otp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    console.log('\n=== STEP 2: VERIFY OTP ===');
    console.log('Using OTP from backend logs:', otp);
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('Status:', res.statusCode);
          console.log('Response:', response);
          resolve(response);
        } catch (e) {
          console.log('Response:', data);
          resolve(null);
        }
      });
    });

    req.on('error', (e) => {
      console.error('Request error:', e);
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

// Step 3: Reset Password
function step3ResetPassword(newPassword) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({ 
      email: testEmail,
      newPassword: newPassword 
    });
    
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/reset-password',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    console.log('\n=== STEP 3: RESET PASSWORD ===');
    console.log('New Password: ' + '*'.repeat(newPassword.length));
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('Status:', res.statusCode);
          console.log('Response:', response);
          resolve(response);
        } catch (e) {
          console.log('Response:', data);
          resolve(null);
        }
      });
    });

    req.on('error', (e) => {
      console.error('Request error:', e);
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

// Run flow with known OTP
async function runFlow() {
  console.log('\n' + '='.repeat(50));
  console.log('TESTING VERIFY OTP & RESET PASSWORD');
  console.log('='.repeat(50));

  // Step 2
  const verifyResponse = await step2VerifyOTP(recentOTP);
  
  if (!verifyResponse || !verifyResponse.success) {
    console.log('\n❌ OTP verification failed');
    console.log('This might mean the OTP expired or is incorrect');
    return;
  }

  // Step 3
  const resetResponse = await step3ResetPassword('NewPassword123@');
  
  if (!resetResponse || !resetResponse.success) {
    console.log('\n❌ Password reset failed');
    return;
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ PASSWORD RESET FLOW SUCCESSFUL');
  console.log('='.repeat(50));
}

// Wait a moment then run
setTimeout(runFlow, 500);
