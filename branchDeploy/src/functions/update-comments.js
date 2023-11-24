export async function getExistingComment(
    octokit,
    owner,
    repo,
    issueNumber,
    messageContent
  ) {
    const parameters = {
      owner,
      repo,
      issue_number: issueNumber,
      per_page: 100,
    };
  
    let found;
  
    for await (const comments of octokit.paginate.iterator(
      octokit.rest.issues.listComments,
      parameters,
    )) {
      found = comments.data.find(({ body }) => {
        return (body?.search(messageContent) ?? -1) > -1;
      });
  
      if (found) {
        break;
      }
    }
  
    if (found) {
      const { id, body } = found;
      return { id, body };
    }
  
    return;
  }
  
  export async function updateComment(
    octokit,
    owner,
    repo,
    existingCommentId,
    body
  ) {
    const updatedComment = await octokit.rest.issues.updateComment({
      comment_id: existingCommentId,
      owner,
      repo,
      body,
    });
  
    return updatedComment.data;
  }
  
  export async function deleteComment(
    octokit,
    owner,
    repo,
    existingCommentId,
  ) {
    const deletedComment = await octokit.rest.issues.deleteComment({
      comment_id: existingCommentId,
      owner,
      repo,
    });
  
    return deletedComment.data;
  }
  
  export async function createComment(
    octokit,
    owner,
    repo,
    issueNumber,
    body
  ) {
    const createdComment = await octokit.rest.issues.createComment({
      issue_number: issueNumber,
      owner,
      repo,
      body,
    });
  
    return createdComment.data;
  }
  