require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const port = process.env.PORT || 9000;

const posts = [
    {
        email: 'naim@gmail.com',
        password: 123456
    },
    {
        email: 'sazid@gmail.com',
        password: 24680
    }
]

app.get('/posts', (req, res) => {

    res.json(posts.filter(post => post.email === req.user.));
});

app.post('/login', authToken, (req, res) => {
   
    const username = req.body.username;
    const user = {name: username};

    const authToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); 

    res.json({token: authToken});

    // jwt.sign({user}, 'secretkey', (err, token) => {
    //     res.json({
    //         token
    //     })
    // })


});

function authToken (req, res, next) {
    const authHeader = req.headers['authorization'];

    if(authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                res.sendStatus(403);
            } else {
                next();
            }
        })
    } else {
        res.sendStatus(403);
    }
}



//Server listening
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});