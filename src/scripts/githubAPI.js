import axios from 'axios';

const auth = { Authorization: `Token ${process.env.REACT_APP_GITHUB_TOKEN}` }; // Temporary till OAuth is implemented

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

export function githubQuery({time, username}) {
  const targetTime = new Date(time);
  targetTime.setDate(targetTime.getDate() - 1);
  return axios({
    url: 'https://api.github.com/graphql',
    method: 'post',
    data: JSON.stringify({
      query: summaryQuery,
      variables: { from: targetTime.toISOString(), username },
    }),
    headers: auth,
  });
}
export const githubNotificationFetcher = (url) => axios.get(url, { headers: auth }).then((res) => res.data);
