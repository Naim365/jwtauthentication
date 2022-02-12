require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const port = process.env.PORT || 4000;


// app.post('/token', (req, res) => {
    
//     const refreshToken = req.body.token;
//     if (refreshToken === process.env.REFRESH_TOKEN) {
//         const accessToken = jwt.sign({ name: 'Naim' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
//         res.json({ accessToken: accessToken });
//         } else {
//             res.sendStatus(401);
//             }
//             });

let refreshTokens = [];

app.post('/token', (req, res) => {
    
    const refreshToken = req.body.token;

    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken : accessToken});
    })
    
});

app.post('/login', (req, res) => {
    
    const username= req.body.username
    const user = {name: username};

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshToken.push(refreshToken);
    res.json({accessToken: accessToken, refreshToken: refreshToken});
});


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m'
    });

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