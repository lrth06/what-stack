//use axios to call github api and get all repos for a user
//use credentials from .env file and username from the args 
require('dotenv').config();

const axios = require('axios');
async function getRepos(username) {
    console.log(`Getting repos for ${username}`);
    //check if user exists

try{
    let languages = {}
    const url = `https://api.github.com/users/${username}/repos`;
    const res = await axios.get(url, {
        headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
    });
        console.log(`Found ${res.data.length} repos`);
        res.data.forEach(repo => {
            if(repo.language) {
                if(languages[repo.language]) {
                    languages[repo.language] += repo.size;
                } else {
                    languages[repo.language] = repo.size;
                }
            } else {
                if(languages["Other"]) {
                    languages["Other"] += repo.size;
                } else {
                    languages["Other"] = repo.size;
                }
            }
        }
        );
        return Object.keys(languages).sort((a,b) => languages[b] - languages[a]).map(key => {
            return {
                language: key,
                size: languages[key]
            }
        }
        )
}catch(err){
    console.log(err);
    return
}
    


}
module.exports = {getRepos};











