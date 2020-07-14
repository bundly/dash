
function getCommentCount(issueComments, currentTime){
    // Filter All comments from the past 24 hours
    const targetTime = new Date(currentTime)
    targetTime.setHours(targetTime.getHours() - 24)
    return issueComments.nodes = issueComments.nodes.filter( (comment)=>{
      const commentTime = new Date(comment.updatedAt)
      return commentTime > targetTime
    } ).length
}

export const yesterdayNotes = (datadump, currentTime) => {
  let yesterday= `
  **Yesterday**:\n`
  const summaryData = datadump.data.viewer
  const commentCount = getCommentCount(summaryData.issueComments, currentTime)
  summaryData.contributionsCollection.pullRequestContributions.nodes.map((pr)=>{
    pr = pr.pullRequest
    yesterday = yesterday.concat(`    - Worked on PR [${pr.title} #${pr.number}](${pr.url}) (Status: ${pr.state.toLowerCase()})\n`)
  })
  summaryData.contributionsCollection.commitContributionsByRepository.map(contribution => {
    yesterday = yesterday.concat(`    - Pushed ${contribution.contributions.totalCount} Commits to [${contribution.repository.nameWithOwner}](${contribution.repository.url})\n`)

  })
  summaryData.contributionsCollection.issueContributions.nodes.map(issue => {
    issue = issue.issue
    yesterday = yesterday.concat(`    - Opened Issue [${issue.title} #${issue.number}](${issue.url})\n`)
  })
  summaryData.contributionsCollection.pullRequestReviewContributions.nodes.map(review => {
    let pr = review.pullRequest
    yesterday = yesterday.concat(`    - Reviewed PR [${pr.title} #${pr.number}](${pr.url})\n`)
  })
  if(summaryData.contributionsCollection.totalPullRequestReviewContributions > 0) yesterday = yesterday.concat(`    - Reviewed ${summaryData.contributionsCollection.totalPullRequestReviewContributions} Pull Requests\n`)
  // if(summaryData.contributionsCollection.totalCommitContributions > 0) yesterday = yesterday.concat(`    - Pushed ${summaryData.contributionsCollection.totalCommitContributions} Commits\n`)
  yesterday = yesterday.concat(`    - ${commentCount} Comments on Issue Discussions\n`)

return yesterday
}
