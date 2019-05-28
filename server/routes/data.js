let express = require('express');
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let router = express.Router();

// mongoose.set('debug', true);

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status('401').send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'mediapark');
    if (!payload) {
        return res.status('401').send('Unauthorized request')

    }

    req.userId = payload.subject;
    next();
}

let Data = require('../model/Data')
let User = require('../model/User')

router.get('/', verifyToken, (req, res) => {

    Data.find().then(data =>

        res.status(200).send(data))
})

router.get('/new', (req, res) => {

    Data.find({
    }).then(data =>

        res.status(200).send(data))
})



router.get('/edit/:id', verifyToken, (req, res) => {

    Data.findOne({
        _id: req.params.id
    }).then(data =>

        res.status(200).send(data))
})
router.post('/post', verifyToken, (req, res) => {

    console.log(req.body)

    const newData = new Data({
        product: req.body.product,
        brand: req.body.brand,
        remainder: req.body.remainder,
        columnName: req.body.columnName,
        columnValue: req.body.columnValue,

    });

    newData.save().then((updateData) => {
        res.status(200).send(updateData)
    })
})
// router.post('/new/column', verifyToken, (req, res) => {

//     console.log(req.body)


// })

router.put('/edit/:id', verifyToken, (req, res) => {

    console.log(req.body)
    Data.findByIdAndUpdate({
        _id: req.params.id
    }, {
            product: req.body.product,
            brand: req.body.brand,
            remainder: req.body.remainder,
            columnName: req.body.columnName,
            columnValue: req.body.columnValue,
        }).then(data => {


            data.save().then((updateData) => {
                res.status(200).send(updateData)
            })

        })

})



router.delete('/delete/:id', verifyToken, (req, res) => {

    Data.findByIdAndDelete({
        _id: req.params.id
    }).then(data => {


        res.status(200).send(data)


    }).catch(err => console.log(err))

})




module.exports = router;