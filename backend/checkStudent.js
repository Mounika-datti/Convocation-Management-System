const pool = require('./config/db');

(async () => {
  try {
    // First, let's see if the connection works
    console.log('Testing database connection...');
    const result = await pool.query('SELECT COUNT(*) FROM students');
    console.log('Students in database:', result.rows[0].count);
    
    // Now check for the specific email
    const checkResult = await pool.query(
      'SELECT id, email, full_name FROM students WHERE email = $1',
      ['mounikadatti05@gmail.com']
    );
    
    if (checkResult.rows.length > 0) {
      console.log('\\n✓ mounikadatti05@gmail.com EXISTS:');
      console.log(checkResult.rows[0]);
    } else {
      console.log('\\n✗ mounikadatti05@gmail.com NOT found in students');
    }
    
    // Check admin users too
    const adminResult = await pool.query(
      'SELECT * FROM admins WHERE email = $1',
      ['mounikadatti05@gmail.com']
    ).catch(() => ({ rows: [] }));
    
    if (adminResult.rows.length > 0) {
      console.log('\\n Found in admins table');
    }
    
  } catch (err) {
    console.error('Error:', err.message);
  }
  process.exit(0);
})();
