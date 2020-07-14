import axios from 'axios';

const auth = { Authorization: `Token ${process.env.REACT_APP_GITHUB_TOKEN}` }; // Temporary till OAuth is implemented
const summaryQuery = `
query summaryQuery($from: DateTime!) {
  viewer {
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
            id
            url
          }
        }
        totalCount
      }
      pullRequestContributions(last: 100) {
        nodes {
          url
          pullRequest {
            state
            title
            url
          }
        }
        totalCount
      }
      pullRequestReviewContributions(last: 100) {
        nodes {
          pullRequestReview {
            id
          }
        }
        totalCount
      }
      startedAt
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
    }
  }
}

`
const issuecommentsQuery = `
{
  viewer {
    issueComments(last: 100) {
      nodes {
        id
        updatedAt
        url
      }
    }
  }
}
`

export function githubSummaryQuery({query, variables}) {
  return axios.post('https://api.github.com/graphql', {
    query: query,
    variables: variables
  }, { headers: auth });
}

export const githubFetcher = (url) => axios.get(url, { headers: auth }).then((res) => res.data);
