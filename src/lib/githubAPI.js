import axios from 'axios';

const auth = { Authorization: `Token ${process.env.REACT_APP_GITHUB_TOKEN}` }; // Temporary till OAuth is implemented

function userQuery() {
  return `
    {
      viewer {
        avatarURL
        login
      }
    }
  `;
}

export function fetchUserData() {
  return axios.post('https://api.github.com/graphql', {
    query: userQuery(),
  }, { headers: auth });
}

export function fetchUserNotifications() {
  return axios.get('https://api.github.com/notifications', { headers: auth });
}

export const githubNotificationFetcher = (url) => axios.get(url, { headers: auth }).then((res) => res.data);
