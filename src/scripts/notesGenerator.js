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


// Handles Suggestions for multiple pods from discussions
function getSuggestions(discussions, username){
  let suggestions = `## Suggestions from Previous Discussions`
  discussions.nodes.map(teamDiscussion => {
    const podName = teamDiscussion.name
    const discussionTitle = teamDiscussion.discussions.nodes[0].title
    suggestions = suggestions.concat(`\n**From ${podName} - ${discussionTitle}:**\n\t\t`)
    const discussionComment = teamDiscussion.discussions.nodes[0].comments.nodes.filter((comment)=> comment.author.login === username )
    console.log(discussionComment)
    discussionComment.map(comment=>{
      suggestions = suggestions.concat('\n')
      suggestions = suggestions.concat(comment.body)
    })
  })
  return suggestions

}

export default function yesterdayNotes(datadump, currentTime, username) {
  let yesterday = `
  **Yesterday**:\n`;
  const summaryData = datadump.data.viewer;
  const commentCount = getCommentCount(summaryData.issueComments, currentTime);
  summaryData.contributionsCollection.pullRequestContributions.nodes.map((pr) => {
    pr = pr.pullRequest;
    yesterday = yesterday.concat(`    - Worked on PR [${pr.title} #${pr.number}](${pr.url}) (Status: ${pr.state.toLowerCase()})\n`);
  });
  summaryData.contributionsCollection.commitContributionsByRepository.map((contribution) => {
    yesterday = yesterday.concat(`    - Pushed ${contribution.contributions.totalCount} Commits to [${contribution.repository.nameWithOwner}](${contribution.repository.url})\n`);
  });
  summaryData.contributionsCollection.issueContributions.nodes.map((issue) => {
    issue = issue.issue;
    yesterday = yesterday.concat(`    - Opened Issue [${issue.title} #${issue.number}](${issue.url})\n`);
  });
  summaryData.contributionsCollection.pullRequestReviewContributions.nodes.map((review) => {
    const pr = review.pullRequest;
    yesterday = yesterday.concat(`    - Reviewed PR [${pr.title} #${pr.number}](${pr.url})\n`);
  });
  if (summaryData.contributionsCollection.totalPullRequestReviewContributions > 0) yesterday = yesterday.concat(`    - Reviewed ${summaryData.contributionsCollection.totalPullRequestReviewContributions} Pull Requests\n`);
  if (commentCount > 0) yesterday = yesterday.concat(`    - ${commentCount} Comments on Issue Discussions\n`);

  yesterday = yesterday.concat(getSuggestions(summaryData.organization.team.childTeams, username))

  return yesterday;
}
