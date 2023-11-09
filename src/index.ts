import axios from "axios";
import * as fs from "fs";

const devops = {
  org: undefined,
  project: undefined,
  repository: undefined,
  pat: undefined,
};
const baseUrl = `https://dev.azure.com/${devops.org}/${devops.project}/_apis/git/repositories/${devops.repository}`;
const pr_url = `${baseUrl}/pullrequests?api-version=7.1-preview.1&searchCriteria.status=completed`;
const completed_pr_url = `${pr_url}&searchCriteria.status=completed`;

const credentialsSeparator = ":";
const credentials = credentialsSeparator + devops.pat;
const base64Token = Buffer.from(credentials).toString("base64");

const options = {
  headers: {
    Authorization: `Basic ${base64Token}`,
  },
};

const fetchData = async () => {
  try {
    
    let jsonResponse: string;
    if(fs.existsSync("pullrequest_response.json")){
        jsonResponse = readFromFile("pullrequest_response.json")
    }
    else{
      console.log(completed_pr_url);
      console.log(options);

      const response = await axios.get(completed_pr_url, options);
      
      console.log(response.status);
      console.log(response.statusText);

      jsonResponse = JSON.stringify(response.data["value"]);
      saveToFile(jsonResponse);
    }

    const pullRequests: PullRequest[] = JSON.parse(jsonResponse);
    console.log(pullRequests.length);

    pullRequests.forEach((pr, idx)=> {
      const link = `https://dev.azure.com/${devops.org}/${devops.project}/_git/${devops.repository}/pullrequest/${pr.pullRequestId}`
      console.log(`PR LINK ${idx}: [${pr.title}](${link})`)
    });

  } catch (error) {
    console.error("error", error);
  }
};

if(devops.pat == undefined) throw new Error('Add your PAT please')
fetchData();

function saveToFile(data: string) {
  const fileName = "pullrequest_response.json";
  fs.writeFile(fileName, data, (err) => {
    if(err)
    {
      console.error("error writing to file", err);
      return;
    }
    console.log(`data saved successfully to ${fileName}`)
  });
}
function readFromFile(fileName: string): string {
  return fs.readFileSync(fileName, 'utf-8');
}

