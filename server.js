require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const posts = [
  
    {
        username: 'Naim',
        title: "Software Engineer"
    },
    {
        username: 'Sazid',
        title: "Ju Software Engineer"
    }
]

app.get('/posts', authenticationToken, (req, res) => {

    // res.json(posts);

  res.json(posts.filter(post => post.username === req.user.name));
});

app.post('/login', (req, res) => {
    
    const username= req.body.username
    const user = {name: username};

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    res.json({accessToken: accessToken});
});

function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })

}
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
  
//     const user = posts.find(post => post.email === email && post.password === password);

//     if (!user) {
//         return res.status(400).json({ message: 'Email or password is wrong' });
//     }

//     const token = jwt.sign({ userId: user.id }, 'secret_this_should_be_longer');

//     res.json({ token });
   
// });

// function authToken (req, res, next) {
//     const authHeader = req.headers['authorization'];

//     if(authHeader) {
//         const token = authHeader.split(' ')[1];
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//             if(err) {
//                 res.sendStatus(403);
//             } else {
//                 next();
//             }
//         })
//     } else {
//         res.sendStatus(403);
//     }
// }



//Server listening
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});