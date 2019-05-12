let express = require('express');
let jwt = require('jsonwebtoken')
let router = express.Router();


// import user schema
let User = require('../model/User');

router.get('', (req, res) => {
    res.status(200).send('signup get route');
});

router.post('', (req, res) => {
    let userInfo = req.body;
    let user = new User(userInfo);

    User.findOne({
        email: userInfo.email
    }).then(foundUser => {
        if (!foundUser) {
            user.save((err, savedUser) => {
                if (err) {
                    console.log(err)
                } else {
                    let payload = { subject: savedUser._id };
                    let token = jwt.sign(payload, 'mediapark');
                    res.status(200).send({ token })
                }
            })
        } else {
            res.status(200).send('This email is already registered')
        }

    })


});





module.exports = router;