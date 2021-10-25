
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const github = require('./github')
//use cors to allow cross origin resource sharing
app.use(cors());
//have a single endpoint that returns the data
app.get('/:id', (req, res) => {
    //call the github api
    const id = req.params.id;
    github.getRepos(id)
        .then(data => { 
            if(data) {
                res.json(data);
            }else{
                res.status(404).json('User not found')
            }
        })
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}
);

