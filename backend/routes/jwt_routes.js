const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Refresh_Token = require('../models/refresh_tokens.model')
require('dotenv').config();

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' }) 
}

router.post('/generateAccessToken', (req, res) => {
    const user = { name: req.body.user};
    const accessToken = generateAccessToken(user)
    const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

    let newToken = new Refresh_Token({
        token
    })
    newToken.save()
     .then(() => {
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
        });
        res.cookie('refreshToken', token, {
            httpOnly: true,
        });
        res.status(200).send("Cookies Set");
     })
})

router.post('/token', (req, res) => {
    console.log("Creating new token")
    const refreshToken = req.cookies['refreshToken'] || ""
    if(refreshToken == null) return res.sendStatus(401)

    const token = { token: refreshToken }
    Refresh_Token.find(token, (err,docs) => {
        if(err) console.log("Error: " + err)
        else if(!docs) return res.sendStatus(403)
        else {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.sendStatus(403)
                accessToken = generateAccessToken({ name: user.name })
                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                });
                res.status(200).send("New Access Token Set");
            })
        }
    })
})

// call this route when logging out to delete refresh token
router.delete('/deleteRefreshToken', (req, res) => {
    const refreshToken = req.cookies['refreshToken']
    const token = { token: refreshToken }
    Refresh_Token.findOneAndDelete(token)
     .then(() => {
         console.log("Deleting Token")
         res.cookie('accessToken', "")
         return res.sendStatus(204)
     })
})

module.exports = router;