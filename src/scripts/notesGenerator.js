/* eslint-disable no-param-reassign, array-callback-return */

import { getUsername } from './githubAPI'

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
  let suggestions = `\r\n### Suggestions from Previous Discussions`
  discussions.nodes.map(teamDiscussion => {
    const podName = teamDiscussion.name
    const discussionTitle = teamDiscussion.discussions.nodes[0].title
    suggestions = suggestions.concat(`\n**From ${podName} - ${discussionTitle}:**\n\t\t`)
    const discussionComment = teamDiscussion.discussions.nodes[1].comments.nodes.filter((comment)=> comment.author.login === username )
    discussionComment.map(comment=>{
      suggestions = suggestions.concat('\n')
      suggestions = suggestions.concat(comment.body)
    })
  })
  return suggestions

}

export default function yesterdayNotes(datadump, currentTime) {
  const username = getUsername()
  let yesterday = `> Generated using [@bundly](https://github.com/bundly)\r\n\r\n**Yesterday**:\r\n `;
  const summaryData = datadump.data.viewer;
  const commentCount = getCommentCount(summaryData.issueComments, currentTime);
  summaryData.contributionsCollection.pullRequestContributions.nodes.map((pr) => {
    pr = pr.pullRequest;
    yesterday = yesterday.concat(`\r\n - Worked on PR [${pr.title} #${pr.number}](${pr.url}) (**Status:** ${pr.state.toLowerCase()} ${pr.state === 'MERGED' ? '🔥':'🕐'})\r\n `);
  });
  summaryData.contributionsCollection.pullRequestReviewContributions.nodes.map((review) => {
    const pr = review.pullRequest;
    yesterday = yesterday.concat(`\r\n - Reviewed PR [${pr.title} #${pr.number}](${pr.url}) 👀\r\n `);
  });
  summaryData.contributionsCollection.commitContributionsByRepository.map((contribution) => {
    yesterday = yesterday.concat(`\r\n - Pushed ${contribution.contributions.totalCount} Commits to [${contribution.repository.nameWithOwner}](https://github.com/${contribution.resourcePath})\r\n `);
  });
  summaryData.contributionsCollection.issueContributions.nodes.map((issue_contribution) => {
    if(issue_contribution){
    const issue = issue_contribution.issue;
    yesterday = yesterday.concat(`\r\n - Opened Issue [${issue.title} #${issue.number}](${issue.url}) ❗\r\n `);
  }
  });
  if (commentCount > 0) yesterday = yesterday.concat(`\r\n - ${commentCount} Comments on Issue Discussions 💬\r\n `);

  yesterday = yesterday.concat(`\r\n**Today:**\r\n `);
  try {
    yesterday = yesterday.concat(getSuggestions(summaryData.organization.team.childTeams, username))

  } catch (error) {
    console.log('BUNDLY NOT ALLOWED IN ORG PLEASE ASK FOR PERMISSION')
  }
  if( yesterday === `> Generated using [@bundly](https://github.com/bundly)\r\n\r\n**Yesterday**:\r\n `)
  yesterday = yesterday.concat(`\r\n  No activity on Github in the last 24 hours  \r\n`);

  return yesterday;
}
