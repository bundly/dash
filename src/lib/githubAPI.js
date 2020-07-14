import axios from 'axios';

const auth = { Authorization: `Token ${process.env.REACT_APP_GITHUB_TOKEN}` }; // Temporary till OAuth is implemented
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
}

`;

export function githubQuery({ query, variables }) {
  return axios.post('https://api.github.com/graphql', {
    query,
    variables,
  }, { headers: auth });
}

export const githubFetcher = (url) => axios.get(url, { headers: auth }).then((res) => res.data);
