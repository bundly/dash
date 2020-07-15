import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // Github username
    username: {
        type: String,
        unique: true,
        required: true
    },
    profile: {
        // id, username, displayName, profileUrl, emails (emails[0].value, etc), photos (photos[0].value, etc)
        type: Object
    },
    accounts: [
        // { kind: 'github', uid: 'fred.rogers' }
        {
            kind: String, // github, discord, etc
            uid: String, // profile.id
            // token = {
            //     "access_token": "6qrZcUqja7812RVdnEKjpzOL4CvHBFG",
            //     "refresh_token": "D43f5y0ahjqew82jZ4NViEr2YafMKhue",
            //     "scope": "identify"
            //     }
            token: Object
        }
    ],
    commits: {
        type: Number,
        default: 0
    }
});

export default userSchema;
