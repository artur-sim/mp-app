let express = require('express');
let jwt = require('jsonwebtoken')
let router = express.Router();


// import user schema
let User = require('../model/User');

router.get('/', (req, res) => {
    res.status(200).send('login get route');
});


router.post('/', (req, res) => {
    let userInfo = req.body;
    User.findOne({
        email: userInfo.email,
    }, (err, user) => {
        if (err) {
            console.log(err);

        } else {
            if (!user) {
                res.status(401).send('user not found')
            } else if (user.password !== userInfo.password) {
                res.status(401).send('invalid password')
            } else {
                let payload = { subject: user._id };
                let token = jwt.sign(payload, 'mediapark');
                res.status(200).send({ token })

            }
        }
    })


});




module.exports = router;