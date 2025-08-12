const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  'https://testingsaketh.netlify.app', // your deployed frontend
  'http://localhost:3000'               // local frontend for dev
];

if (process.env.NODE_ENV === 'production') {
  // Restrict CORS in production
  app.use(cors({
    origin: function (origin, callback) {
      // allow requests with no origin like Postman, curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));
} else {
  // Open CORS for dev
  app.use(cors());
}

app.use(express.json());

app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server  running on port ${PORT}`));
