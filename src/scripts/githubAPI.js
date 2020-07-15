import axios from 'axios';

const auth = { Authorization: `Token ${process.env.REACT_APP_GITHUB_TOKEN}` }; // Temporary till OAuth is implemented
/*

GraphiQl seems to be fine having this query, does not work anywhere else
Internal Server error xD


*/

export const summaryQuery = `
query summaryQuery($from: DateTime!) {
  viewer {
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

export function githubQuery(time) {
  const targetTime = new Date(time);
  targetTime.setHours(targetTime.getHours() - 24);
  return axios({
    url: 'https://api.github.com/graphql',
    method: 'post',
    data: JSON.stringify({
      query: summaryQuery,
      variables: { from: targetTime.toISOString() },
    }),
    headers: auth,
  });
}
export const githubNotificationFetcher = (url) => axios.get(url, { headers: auth }).then((res) => res.data);
