const express = require("express")
const app = express()
const cors = require("cors")

const userRoutes = require('./src/routes/userRoutes')
const weddingOfferRoutes = require('./src/routes/weddingOfferRoutes')

app.use(express.json())
app.use(cors())

app.use('/users', userRoutes)
app.use('/wedding-offers', weddingOfferRoutes)

app.listen(3000, ()=>{
    console.log("Server On at PORT 3000")
})