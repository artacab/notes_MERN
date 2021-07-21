const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 5000

async function start() {
    try {
        await mongoose.connect('mongodb+srv://artacab:artacab@cluster0.e1iau.mongodb.net/notes?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        })
        app.listen(PORT, () => {
            console.log(`server on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()