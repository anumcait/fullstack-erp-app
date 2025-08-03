const path = require('path');
const dotenv = require('dotenv');

// Auto-detect environment and load corresponding .env file
const ENV = process.env.NODE_ENV || 'development';

dotenv.config({
  path: path.resolve(__dirname, `.env.${ENV}`)
});

const app = require('./app'); // ✅ import Express app
const sequelize = require('./config/db');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log(`✅ Connected to ${ENV} database`);

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ DB connection failed:', error);
  }
}

startServer();

