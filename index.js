const express = require("express")
const bodyparser = require("body-parser")
const { PrismaClient } = require("@prisma/client")
const bcrypt = require('bcrypt');
const app = express()

app.use(express.json())
const prisma = new PrismaClient()

// Users tabel
// get data users
app.get("/users", async (req,res) => {
    const result = await prisma.user.findMany()
    res.send(result)
})

// create new user
app.post("/users", async (req, res)=> {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10) //hash PW before store to DB
    const result = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
    console.log(result)
    res.send(result)
})

//book tabel
//get data books
app.get("/books", async (req,res) => {
    const result = await prisma.book.findMany()
    res.send(result)
})

// get data book with user id
app.get("/books/:userId", async (req,res) => {
    const { userId } = req.params
    const result = await prisma.book.findMany({
        where: {
            userId: parseInt(userId)
        }
    })
    console.log(result)
    res.send(result)
})

// get data book with user data, and book user have data
app.get("/books/:userId/:id", async (req,res) => {
    const { userId, id } = req.params
    const result = await prisma.book.findMany({
        where: {
            userId: parseInt(userId),
            id: parseInt(id)
        }
    })
    console.log(result)
    res.send(result)
})

//store book data with id user reference
app.post("/books", async (req, res)=> {
    const { userId, name, genre, image } = req.body
    const result = await prisma.book.create({
        data: {
            userId,
            name,
            genre,
            image
        }
    })
    console.log(result)
    res.send(result)
})

// update data book with user id, and book id reference
app.put("/books/:userId/:id", async (req, res)=> {
    const { id, userId } = req.params
    const { name, genre, image } = req.body
    const result = await prisma.book.update({
        where: {
            id: parseInt(id),
            userId: parseInt(userId)
        },
        data: {
            name,
            genre,
            image
        }
    })
    console.log(result)
    res.send(result)
})

/* app.put("/books/:id", async (req, res)=> {
    const { id } = req.params
    const { userId, name, genre, image } = req.body
    const result = await prisma.book.update({
        where: {
            id: parseInt(id)
        },
        data: {
            userId,
            name,
            genre,
            image
        }
    })
    console.log(result)
    res.send(result)
}) */

app.listen(3000, ()=>{
    console.log("Server On at PORT 3000")
})


/* 
Button untuk transaksi ada 3
Belum: 
Sudah: 
Cancel:

*/