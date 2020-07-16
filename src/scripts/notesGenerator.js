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
  let suggestions = `\r\n## Suggestions from Previous Discussions`
  discussions.nodes.map(teamDiscussion => {
    const podName = teamDiscussion.name
    const discussionTitle = teamDiscussion.discussions.nodes[0].title
    suggestions = suggestions.concat(`\n**From ${podName} - ${discussionTitle}:**\n\t\t`)
    const discussionComment = teamDiscussion.discussions.nodes[0].comments.nodes.filter((comment)=> comment.author.login === username )
    discussionComment.map(comment=>{
      suggestions = suggestions.concat('\n')
      suggestions = suggestions.concat(comment.body)
    })
  })
  return suggestions

}

export default function yesterdayNotes(datadump, currentTime, username) {
  let yesterday = `**Yesterday**:\r\n `;
  const summaryData = datadump.data.viewer;
  const commentCount = getCommentCount(summaryData.issueComments, currentTime);
  summaryData.contributionsCollection.pullRequestContributions.nodes.map((pr) => {
    pr = pr.pullRequest;
    yesterday = yesterday.concat(`\r\n - Worked on PR [${pr.title} #${pr.number}](${pr.url}) (Status: ${pr.state.toLowerCase()})\r\n `);
  });
  summaryData.contributionsCollection.commitContributionsByRepository.map((contribution) => {
    yesterday = yesterday.concat(`\r\n - Pushed ${contribution.contributions.totalCount} Commits to [${contribution.repository.nameWithOwner}](${contribution.repository.url})\r\n `);
  });
  summaryData.contributionsCollection.issueContributions.nodes.map((issue) => {
    issue = issue.issue;
    yesterday = yesterday.concat(`\r\n - Opened Issue [${issue.title} #${issue.number}](${issue.url})\r\n `);
  });
  summaryData.contributionsCollection.pullRequestReviewContributions.nodes.map((review) => {
    const pr = review.pullRequest;
    yesterday = yesterday.concat(`\r\n - Reviewed PR [${pr.title} #${pr.number}](${pr.url})\r\n `);
  });
  if (commentCount > 0) yesterday = yesterday.concat(`\r\n - ${commentCount} Comments on Issue Discussions\r\n `);

  yesterday = yesterday.concat(`\r\n**Today:**\r\n `);
  yesterday = yesterday.concat(getSuggestions(summaryData.organization.team.childTeams, username))

  return yesterday;
}
