const {Router} = require('express')
const User = require('../models/User')
const router = Router()
const {check, validationResult} = require('express-validator')
const bcrypter = require('bcryptjs')
const jwtToken = require('jsonwebtoken')

router.post('/registration',
[
    check('email', 'Некорректный емэйл').isEmail(),
    check('password', 'Некорректный пароль').isLength({min: 6})
],
async (req, res) => {
    try {

        const errors = validationResult(req)
        if(errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'wrong register data!'
            })
        }

        const {email, password} = req.body
        const isUser = await User.findOne({email})

        if(isUser) {
            res.status(300).json({message: 'Данный Email занят!'})
        }

        const  hashedPassword = await bcrypter.hash(password, 12)

        const user = new User({
            email, password: hashedPassword
        })

        await user.save()

        res.status(201).json({message: 'user is create!'})

    } catch(error) {
        console.log('cee')
    }
})

router.post('/login',
[
    check('email', 'Некорректный емэйл').isEmail(),
    check('password', 'Некорректный пароль').exists()
],
async (req, res) => {
    try {

        const errors = validationResult(req)
        if(errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'wrong register data!'
            })
        }

        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message: 'This email not exists in database!'})
        }

        const isMatch = bcrypter.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({message: 'пароли не совпадают'})
        }

        const jwtSecret = 'sagwgwegwegwegzxgas' 

        const token = jwtToken.sign(
            {userId: user.id},
            jwtSecret,
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})

    } catch(error) {
        console.log('cee')
    }
})

module.exports = router