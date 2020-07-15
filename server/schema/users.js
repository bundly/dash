import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    // Github username
    username: {
        type: String
    },
    accounts: [
        // { kind: 'github', uid: 'fred.rogers' }
        {
            kind: String,
            uid: String,
            // {
            //     "access_token": "6qrZcUqja7812RVdnEKjpzOL4CvHBFG",
            //     "token_type": "Bearer",
            //     "expires_in": 604800,
            //     "refresh_token": "D43f5y0ahjqew82jZ4NViEr2YafMKhue",
            //     "scope": "identify"
            // }
            token: Object
        }
    ],
    commits: Number
});

export default usersSchema;
