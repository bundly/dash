import dotenv from 'dotenv';
dotenv.config();

export const {
    DB_NAME,
    MONGO_PASSWORD,
    API_KEY,
    SALT_ROUNDS
} = process.env;

// TODO: Replace with Atlas URL
// export const DB_URL = `mongodb+srv://saurav:${MONGO_PASSWORD}@fifa.ejduy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
export const DB_URL = 'mongodb://localhost:27017/dash';
export const API_PORT = process.env.API_PORT || 5000;

export let hosts = [];
export let TURN_INTERVAL = 0;
if (process.env.NODE_ENV === 'production') {
    // React App Deployed URLs
    hosts = ['https://dash-delta.vercel.app', 'https://bundly.space'];
} else {
    // React App URL
    hosts = ['http://localhost:3000'];
}
