const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Refresh_Token = require('../models/refresh_tokens.model')
require('dotenv').config();

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }) //update time after testing done
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
        res.json({ accessToken: accessToken, refreshToken: token })
     })
})

router.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) return res.sendStatus(401)

    const token = { token: refreshToken }
    Refresh_Token.find(token, (err,docs) => {
        if(err) console.log("Error: " + err)
        else if(!docs) return res.sendStatus(403)
        else {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.sendStatus(403)
                const accessToken = generateAccessToken({ name: user.name })
                res.json({ accessToken: accessToken })
            })
        }
    })
})

// call this route when logging out to delete refresh token
router.delete('/deleteRefreshToken', (req, res) => {
    const token = { token: req.body.token }
    Refresh_Token.findOneAndDelete(token)
     .then(() => {
         return res.sendStatus(204)
     })
})

module.exports = router;