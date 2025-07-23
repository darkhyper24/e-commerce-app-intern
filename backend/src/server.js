const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const { products } = require('./models/products');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.get('/', (req, res) => {
  res.send('Welcome to Payment Gateway API');
});

app.use('/api/auth', authRoutes);
app.use('/api', homeRoutes);



const startServer = async () => {
  try {
    console.log('🔄 Syncing database models...');
    
    // Sync the products model to create the table
    await products.sync({ force: false });
    console.log('✅ Products table synced successfully');
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
    
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

startServer();