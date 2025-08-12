const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: ["https://testingsaketh.netlify.app/"], // your Netlify domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
})); // Allow frontend to connect
app.use(express.json());

app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
