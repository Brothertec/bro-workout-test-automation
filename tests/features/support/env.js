const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env'),
});

process.env.BASE_URL =
  process.env.BASE_URL || 'https://bro-workout-frontend.vercel.app';
