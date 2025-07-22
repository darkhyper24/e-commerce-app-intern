# Wait for database to be ready
echo "Waiting for database..."
sleep 5

# Run the application
node server.js &


echo "Checking if database needs seeding..."
node -e '
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function checkIfDataExists() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT COUNT(*) FROM users");
    const userCount = parseInt(result.rows[0].count);
    client.release();
    
    if (userCount === 0) {
      console.log("🌱 No users found. Running seeders...");
      require("./seeder/main").runSeeders();
    } else {
      console.log("✅ Database already seeded. Skipping seeder.");
    }
  } catch (err) {
    console.error("Error checking database:", err);
    process.exit(1);
  }
}

checkIfDataExists();
'

# Keep container running
wait