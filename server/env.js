import dotenv from 'dotenv';
dotenv.config();

export const {
    DB_NAME,
    MONGO_PASSWORD,
    API_KEY,
    SALT_ROUNDS
} = process.env;

export const DB_URL = 'mongodb://localhost:27017/dash';
export const API_PORT = process.env.API_PORT || 5000;

export let hosts = [];
export let callbackUrl = '';
export let TURN_INTERVAL = 0;
if (process.env.NODE_ENV === 'production') {
    // React App Deployed URLs
    hosts = ['https://dash-delta.vercel.app', 'https://bundly.tech', 'https://dash.bundly.tech'];
    callbackUrl = 'https://bundly.tech/api';
} else {
    // React App URL
    hosts = ['http://localhost:3000'];
    callbackUrl = 'http://localhost:5000';
}
