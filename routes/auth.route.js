const {Router} = require('express')
const User = require('../models/User')
const User = require('../models/User')
const router = Router()

router.post('/registration', (req, res) => {
    try {
        const {email, password} = req.body
        const isUser = await User.findOne({email})

        if(isUser) {
            res.status(300).json({message: 'Данный Email занят!'})
        }
        const user = new User({
            email, password
        })

        await user.save()

        res.status(201).json({message: 'user is create!'})

    } catch(error) {
        console.log(error)
    }
})

module.exports = router