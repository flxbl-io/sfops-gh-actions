const { execSync } = require("child_process");
const octokit = require("@octokit/rest");
const dedent = require("dedent-js");

async function checkInUseSandbox(githubRepo, devhubUserName, token) {
  const client = new octokit.Octokit({ auth: token });

  if (client === undefined || this.client === null) {
    throw new Error("Unable to create GitHub client");
  }

  let output="";
  try {
    output = execSync(
      `gh api /repos/${githubRepo}/actions/variables --paginate | gh merge-json | jq ".variables[] | select(.name | test(\\"_SBX$\\")).name"`
    ).toString();
  } catch (error) {
    console.log(`Unable to read variables from ${githubRepo}...Exiting`);
    process.exit(1);
  }

  const sandboxes = output.trim().split("\n");

  if (sandboxes.length === 0 || sandboxes[0] === "") {
    console.log(`No Sandboxes found..Exiting`);
    process.exit(1);
  }

  // Figure out assigned  sandboxes
  for (const sandboxName of sandboxes) {
    try {
      if (sandboxName.trim() === "") continue;

      const sandbox = JSON.parse(
        execSync(
          `gh api /repos/${githubRepo}/actions/variables/${sandboxName.trim()} --jq ".value"`
        ).toString()
      );
      const { status, isActive, name, issue } = sandbox;
      console.log(
        `Checking Name:${name}..Status:${status}...IsActive:${isActive}...Issue:${
          issue ? issue : "N/A"
        }.`
      );

      // Check if the sandbox is associated with the issue
      if (issue && status === "Available" && isActive) {
        console.log(`Sandbox ${name} is assigned for issue ${issue}, ...`);

        try {
          console.log(`Authenticating to   ${sandboxName}`);
          execSync(
            `sf org sandbox resume -n ${name} -o ${devhubUserName}`
          ).toString();
        } catch (error) {
          console.log(
            `Skipping Sandbox  ${sandboxName} authentication due to error during authentication`
          );
        }

        console.log(`Figuring details for  ${sandboxName}`);
        const sandboxDetails = JSON.parse(
          execSync(`sf org open -r -o ${devhubUserName}.${name} --json`)
        );

        const message = dedent(`
            <!--Org Details-->

            Please find the updated details of the review org associated with this issue.

            | Org Details      |                                                                                                                                                                                                               |
            | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
            | Org Id           | ${sandboxDetails.result.orgId}                                                                                                                                                                                            |
            | Username         | ${sandboxDetails.result.username}                                                                                                                                                                         |
            | Login to the org | [Click Here](${sandboxDetails.result.url}) |
    `);

        let commentDetails = await getExistingComment(
          client,
          githubRepo.split("/")[0],
          githubRepo.split("/")[1],
          issue,
          "<!--Org Details-->"
        );

        if (commentDetails) {
          console.log(`Updating comment for Sandbox ${sandboxName}`);
          await updateComment(
            client,
            githubRepo.split("/")[0],
            githubRepo.split("/")[1],
            commentDetails.id,
            message
          );
        } else {
          await createComment(
            client,
            githubRepo.split("/")[0],
            githubRepo.split("/")[1],
            issue,
            message
          );
        }
      }
    } catch (error) {
      console.log(`Skipping Sandbox ${sandboxName} due to error`);
      console.error(error.message);
    }
  }
}

async function getExistingComment(
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
    parameters
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

async function updateComment(octokit, owner, repo, existingCommentId, body) {
  const updatedComment = await octokit.rest.issues.updateComment({
    comment_id: existingCommentId,
    owner,
    repo,
    body,
  });

  return updatedComment.data;
}

async function deleteComment(octokit, owner, repo, existingCommentId) {
  const deletedComment = await octokit.rest.issues.deleteComment({
    comment_id: existingCommentId,
    owner,
    repo,
  });

  return deletedComment.data;
}

async function createComment(octokit, owner, repo, issueNumber, body) {
  const createdComment = await octokit.rest.issues.createComment({
    issue_number: issueNumber,
    owner,
    repo,
    body,
  });

  return createdComment.data;
}

const [githubRepo, devhubUserName, ghToken] = process.argv.slice(2);

checkInUseSandbox(githubRepo, devhubUserName, ghToken);
