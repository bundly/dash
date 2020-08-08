import dotenv from 'dotenv';
dotenv.config();

export const { MONGO_URI, API_KEY, SALT_ROUNDS } = process.env;

export const API_PORT = process.env.API_PORT || 5000;

export let DB_URL = MONGO_URI;
export let hosts = [];
export let callbackUrl = '';
export const TURN_INTERVAL = 0;
if (process.env.NODE_ENV === 'production') {
    // React App Deployed URLs
    hosts = ['https://bundly.tech', 'https://dash-delta.vercel.app', 'https://dash.bundly.tech'];
    callbackUrl = 'https://bundly.tech/api';
    DB_URL = 'mongodb://mongo:27017/dash'
  } else {
    // React App URL
    hosts = ['http://localhost:3000'];
    callbackUrl = 'http://localhost:5000';
    DB_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/dash'
}
