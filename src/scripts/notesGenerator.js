/* eslint-disable no-param-reassign, array-callback-return */

function getCommentCount(issueComments, currentTime) {
  // Filter All comments from the past 24 hours
  const targetTime = new Date(currentTime);
  targetTime.setHours(targetTime.getHours() - 24);
  return issueComments.nodes.filter((comment) => {
    const commentTime = new Date(comment.updatedAt);
    return commentTime > targetTime;
  }).length;
}

export default function yesterdayNotes(datadump, currentTime) {
  let yesterday = `
  **Yesterday**:\n`;
  const summaryData = datadump.data.viewer;
  const commentCount = getCommentCount(summaryData.issueComments, currentTime);
  summaryData.contributionsCollection.pullRequestContributions.nodes.map((pr) => {
    pr = pr.pullRequest;
    yesterday = yesterday.concat(`    - Worked on PR [${pr.title} #${pr.number}](${pr.url}) (Status: ${pr.state.toLowerCase()})\n`);
  });
  // Commented cuz of bug in github api
  // summaryData.contributionsCollection.commitContributionsByRepository.map((contribution) => {
  //   yesterday = yesterday.concat(`    - Pushed ${contribution.contributions.totalCount} Commits to [${contribution.repository.nameWithOwner}](${contribution.repository.url})\n`);
  // });
  summaryData.contributionsCollection.issueContributions.nodes.map((issue) => {
    issue = issue.issue;
    yesterday = yesterday.concat(`    - Opened Issue [${issue.title} #${issue.number}](${issue.url})\n`);
  });
  summaryData.contributionsCollection.pullRequestReviewContributions.nodes.map((review) => {
    const pr = review.pullRequest;
    yesterday = yesterday.concat(`    - Reviewed PR [${pr.title} #${pr.number}](${pr.url})\n`);
  });
  if (summaryData.contributionsCollection.totalPullRequestReviewContributions > 0) yesterday = yesterday.concat(`    - Reviewed ${summaryData.contributionsCollection.totalPullRequestReviewContributions} Pull Requests\n`);
  yesterday = yesterday.concat(`    - ${commentCount} Comments on Issue Discussions\n`);

  return yesterday;
}
