//use axios to call github api and get all repos for a user
//use credentials from .env file and username from the args 
require('dotenv').config();

const axios = require('axios');
async function getRepos(username) {
    console.log(`Getting repos for ${username}`);
    let languages = {}
    const url = `https://api.github.com/users/${username}/repos`;
    const res = await axios.get(url, {
        headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
    })
    //get all repos for a user and store the languages in an object with the value being the size of the repo
    //if a language is already in the object, add the size to the existing value
    if(res.data.length > 0) {
        console.log(`Found ${res.data.length} repos`);
        res.data.forEach(repo => {
           //return the languages and the size of the repo and add to a json object
           //if repo.language is null set it to 'Other"
              if(repo.language === null) {
                repo.language = 'Other';
              }
                if(languages[repo.language]) {
                    languages[repo.language] += repo.size;
                }
                else {
                    languages[repo.language] = repo.size;
                }
                console.log(`Adding ${repo.size} lines of ${repo.language}  from ${repo.name}`);
    
        })
    }  
    console.log(languages);
    return languages;

}
module.exports = {getRepos};











