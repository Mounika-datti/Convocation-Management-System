const http = require('http');

let storedOTP = null;
let testEmail = 'mounikadatti05@gmail.com';

// Step 1: Request OTP
function step1RequestOTP() {
  return new Promise((resolve) => {
    const postData = JSON.stringify({ email: testEmail });
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

    console.log('\n=== STEP 1: REQUEST OTP ===');
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const response = JSON.parse(data);
        console.log('Status:', res.statusCode);
        console.log('Message:', response.message);
        console.log('OTP in response:', response.otp ? 'YES (BAD!)' : 'NO (GOOD!)');
        
        if (response.otp) {
          storedOTP = response.otp;
          console.log('Using OTP from response (for testing):', storedOTP);
        } else {
          // In real scenario, user would get OTP from email
          console.log('⚠️  OTP not in response - check email for OTP');
          console.log('For this test, please enter OTP from email or provide it:');
          storedOTP = '000000'; // Placeholder
        }
        resolve(response);
      });
    });

    req.write(postData);
    req.end();
  });
}

// Step 2: Verify OTP (simulated with generated OTP)
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
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('Status:', res.statusCode);
          console.log('Message:', response.message);
          console.log('OTP Valid:', response.success);
          resolve(response);
        } catch (e) {
          console.log('Response:', data);
          resolve(null);
        }
      });
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
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log('Status:', res.statusCode);
          console.log('Message:', response.message);
          resolve(response);
        } catch (e) {
          console.log('Response:', data);
          resolve(null);
        }
      });
    });

    req.write(postData);
    req.end();
  });
}

// Run full flow
async function runFullFlow() {
  console.log('\n' + '='.repeat(50));
  console.log('PASSWORD RESET FLOW TEST');
  console.log('='.repeat(50));

  // Step 1
  const forgotResponse = await step1RequestOTP();
  
  if (!forgotResponse.success) {
    console.log('\n❌ Forgot password request failed');
    return;
  }

  // Check if we have OTP
  if (!storedOTP || storedOTP === '000000') {
    console.log('\n⏳ TEST PAUSED - Please enter OTP from email');
    console.log('Note: OTP is being sent to your email address');
    console.log('Check: mounikadatti05@gmail.com');
    return;
  }

  // Step 2
  const verifyResponse = await step2VerifyOTP(storedOTP);
  
  if (!verifyResponse || !verifyResponse.success) {
    console.log('\n❌ OTP verification failed');
    return;
  }

  // Step 3
  const resetResponse = await step3ResetPassword('NewPassword123@');
  
  if (!resetResponse || !resetResponse.success) {
    console.log('\n❌ Password reset failed');
    return;
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ PASSWORD RESET FLOW COMPLETED SUCCESSFULLY');
  console.log('='.repeat(50));
}

runFullFlow();
