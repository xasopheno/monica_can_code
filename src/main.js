import { Octokit } from "@octokit/core";
import dotenv from "dotenv";
dotenv.config();

//  https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// https://docs.github.com/en/search-github/searching-on-github/searching-users#search-by-account-name-full-name-or-public-email
//
async function searchUsers() {
  const queryString = "q=" + encodeURIComponent("pytorch in:bio hireable:true");

  try {
    const response = await octokit.request("GET /users", {
      q: queryString,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      since: 10000,
      per_page: 100,
    });

    console.log(response);
  } catch (error) {
    console.error("Error occurred while searching users:", error);
  }
}

function main() {
  searchUsers()
    .then(() => {})
    .catch((error) =>
      console.error("Error occurred while searching users:", error)
    );
}

main();
