import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // Github username
    username: {
        type: String,
        unique: true,
        required: true
    },
    githubProfile: {
        // id, username, displayName, profileUrl, emails (emails[0].value, etc), photos (photos[0].value, etc)
        type: Object,
        required: true
    },
    discordProfile: {
        // all discord thingys idk
        type: Object,
        default: {}
    },
    accounts: [
        {
            kind: String, // type = 'github' | 'discord' | 'google'
            uid: { type: String, required: false }, // github profile id
            token: Object // token = {"access_token": "6qrZcUqja7812RVdnEKjpzOL4CvHBFG", "refresh_token": "D43f5y0ahjqew82jZ4NViEr2YafMKhue" }
        }
    ],
    commits: {
        type: Number,
        default: 0
    }
});

export default userSchema;
