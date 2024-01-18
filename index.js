const express = require("express")
//const bodyparser = require("body-parser")
const { PrismaClient } = require("@prisma/client")
const bcrypt = require('bcrypt');
const app = express()
const cors = require("cors")
const session = require('express-session');

// Use express-session middleware
app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

app.use(express.json())
app.use(cors())
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

/* weddingOffer section */
app.get("/wedding-offers", async (req,res) => {
    const result = await prisma.weddingOffer.findMany()
    res.send(result)
})

// get data weddingOffer with user id
app.get("/wedding-offers/:userId", async (req,res) => {
    const { userId } = req.params
    const result = await prisma.weddingOffer.findMany({
        where: {
            userId: parseInt(userId)
        }
    })
    console.log(result)
    res.send(result)
})

// get data weddingOffer with user data, and weddingOffer user have data
app.get("/wedding-offers/:userId/:id", async (req,res) => {
    const { userId, id } = req.params
    const result = await prisma.weddingOffer.findMany({
        where: {
            userId: parseInt(userId),
            id: parseInt(id)
        }
    })
    console.log(result)
    res.send(result)
})

//store weddingOffer data with id user reference
app.post("/wedding-offers", async (req, res)=> {
    const { userId, weddingOfferName, weddingOfferAuthor, weddingOfferPrice, weddingOfferDescription, weddingOfferImg } = req.body
    const result = await prisma.weddingOffer.create({
        data: {
            userId,
            weddingOfferName,
            weddingOfferAuthor,
            weddingOfferPrice: parseInt(weddingOfferPrice),
            weddingOfferDescription,
            weddingOfferImg
        }
    })
    console.log(result)
    res.send(result)
})

// update data weddingOffer with user id, and weddingOffer id reference
app.put("/wedding-offers/:userId/:id", async (req, res)=> {
    const { id, userId } = req.params
    const { weddingOfferName, weddingOfferAuthor, weddingOfferPrice, weddingOfferDescription, weddingOfferImg } = req.body
    const result = await prisma.weddingOffer.update({
        where: {
            id: parseInt(id),
            userId: parseInt(userId)
        },
        data: {
            weddingOfferName,
            weddingOfferAuthor,
            weddingOfferPrice,
            weddingOfferDescription,
            weddingOfferImg
        }
    })
    console.log(result)
    res.send(result)
})


app.listen(3000, ()=>{
    console.log("Server On at PORT 3000")
})


/* 
Button untuk transaksi ada 3
Belum: 
Sudah: 
Cancel:

*/

//Login Auth
/* app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await prisma.user.findUnique({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Check if the password is correct using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Store user ID in the session
      req.session.userId = user.id;
  
      // Authentication successful
      res.redirect('/admin');
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  //Admin page
  app.get('/admin', (req, res) => {
    // Validate session and check for authorization
    if (req.session && req.session.user) {
      // Only authenticated and authorized users can access the admin
      res.render('dk');
    } else {
      // Redirect to login page or show unauthorized error
      res.redirect('/login');
    }
  }); */