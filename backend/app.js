const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const client = require('prom-client');
client.collectDefaultMetrics();

require('dotenv').config(); // make sure .env is loaded before using

const employeeRoutes = require('./routes/employeeRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const ondutyRoutes = require('./routes/ondutyRoutes');
const jasperRoutes = require('./routes/jasperRoutes');


const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost',
  'http://localhost:5173',
  'http://52.4.231.1',
  'https://fullstack-hr-app-frontend.onrender.com',
];

// Middlewares
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Session middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'default_session_secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, // true if using HTTPS
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60 * 2 // 2 hours
//   }
// }));

app.use(session({
  secret: 'your_secret_here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set to true in production with HTTPS
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/onduty', ondutyRoutes);
app.use('/api/jasper', jasperRoutes);
app.use('/api/auth', authRoutes);


// Health check
app.get('/', (req, res) => res.send('✅ App is running.'));

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

module.exports = app;
