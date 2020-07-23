import axios from "axios";

export function getToken() {
  const bundlyToken = localStorage.getItem("bundly-token");
  let githubToken;
  if (bundlyToken) {
    githubToken = JSON.parse(atob(bundlyToken)).tokens[0].token.accessToken;
  }
  return {
    token: githubToken,
    header: { Authorization: `Token ${githubToken}` },
  };
}

export function getUsername() {
  const bundlyToken = localStorage.getItem("bundly-token");
  let username;
  if (bundlyToken) username = JSON.parse(atob(bundlyToken)).username;
  return username;
}

export const summaryQuery = `
query summaryQuery($from: DateTime!, $username: [String!]) {
  viewer {
    organization(login: "MLH-Fellowship") {
      team(slug: "mlh-fellows-summer-2020") {
        childTeams(userLogins: $username, first: 5) {
          nodes {
            discussions(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
              nodes {
                title
                createdAt
                url
                comments(first: 15) {
                  nodes {
                    author {
                      login
                    }
                    body
                  }
                }
              }
            }
            name
            slug
            discussionsUrl
          }
        }
      }
    }
    issueComments(last: 100) {
      nodes {
        updatedAt
      }
    }
    contributionsCollection(from: $from) {
      commitContributionsByRepository(maxRepositories: 10) {
        resourcePath
        repository {
          nameWithOwner
          url
        }
        contributions(orderBy: {field: OCCURRED_AT, direction: ASC}) {
          totalCount
        }
      }
      issueContributions(last: 100) {
        nodes {
          issue {
            title
            number
            url
          }
        }
        totalCount
      }
      pullRequestContributions(last: 100) {
        nodes {
          pullRequest {
            state
            title
            url
            number
          }
        }
        totalCount
      }
      pullRequestReviewContributions(last: 100) {
        nodes {
          pullRequest {
            number
            url
            title
          }
        }
      }
      startedAt
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
    }
  }
}`;

export function markNotification(id) {
  // console.log(`Using`,  getToken())
  return axios.patch(
    `https://api.github.com/notifications/threads/${id}`,
    {},
    { headers: getToken().header }
  );
}

export function githubQuery({ time }) {
  // console.log(getToken(), getUsername())

  const targetTime = new Date(time);
  targetTime.setDate(targetTime.getDate() - 1);
  return axios({
    url: "https://api.github.com/graphql",
    method: "post",
    data: JSON.stringify({
      query: summaryQuery,
      variables: { from: targetTime.toISOString(), username: getUsername() },
    }),
    headers: getToken().header,
  });
}
export const githubNotificationFetcher = () =>
  axios.get("https://api.github.com/notifications", { headers: getToken().header });
export const githubSearch = (text) =>
  axios.get(
    `https://api.github.com/search/issues?q=${encodeURI(
      text
    )}%20org%3Amlh-Fellowship`,
    { headers: getToken().header }
  );
