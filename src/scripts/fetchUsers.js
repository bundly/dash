// From https://github.com/MLH-Fellowship/0.2.1-fellowbook/blob/master/github-api/fetcher.js

const fetch = require('node-fetch');
const fs = require('fs');

const query = `
{
  organization(login: "MLH-Fellowship") {
    teams(first: 100) {
      edges {
        node {
          description
          name
          id
          members {
            nodes {
              avatarUrl
              login
              name
            }
          }
        }
      }
    }
  }
}`;

const fetchUsers = async () => {
  const response = await fetch(
    'https://api.github.com/graphql',
    {
      method: 'post',
      headers: {
        Authorization: `Token ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    },
  );
  const json = await response.json();
  const teams = json.data.organization.teams.edges;

  const users = [];
  teams.forEach((obj) => {
    const team = obj.node;

    // Skip the parent teams; CTF would include people in other pods, so ignore that too
    if (['TTP Fellows (Summer 2020)', 'CTF', 'MLH Fellows (Summer 2020)'].includes(team.name)) return;

    const members = team.members.nodes;
    members.forEach((user) => {
      users.push({
        avatar_url: user.avatarUrl,
        username: user.login.toLowerCase(),
        name: user.name,
        pod_ids: [team.name.replace('Pod ', '')],
      });
    });
  });

  return users;
};

const saveUsers = async (users) => {
  // Merge Pod ids for people in multiple pods
  users = [...users.reduce((m, o) => {
    const { username } = o;
    const obj = m.get(username);
    return obj ? m.set(username, {
      username,
      pod_ids: [...new Set(obj.pod_ids.concat(o.pod_ids))],
    })
      : m.set(username, o);
  }, new Map())
    .values()];
  const usersCount = users.length;

  // save all users as a single big JSON file
  const allUsersString = JSON.stringify(users, null, 2);
  fs.writeFileSync('./data/allUsers.json', allUsersString, 'utf8');
  console.log(`Saved ${usersCount} users to ./data/allUsers.json`);

  const usernames = { data: [] };
  for (const user of users) usernames.data.push(user.username);
  const allUsernamesString = JSON.stringify(usernames, null, 2);
  fs.writeFileSync('./data/usernames.json', allUsernamesString, 'utf8');
  console.log(`Saved ${usersCount} users to ./data/usernames.json`);

  return users;
};

fetchUsers().then((users) => saveUsers(users));
