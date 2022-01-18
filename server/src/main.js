import express from 'express'


const port = process.argv[2] || 8080
const app = express()

app.use(express.static('client'))

app.listen(port, () => {
    console.log(`listening on localhost:${port}`)
})