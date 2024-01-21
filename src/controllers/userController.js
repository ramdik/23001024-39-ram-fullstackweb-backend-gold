const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    const result = await prisma.user.findMany();
    res.send(result);
};

const getIdUser = async (req, res) => {
    const { id } = req.params;
    const result = await prisma.user.findMany({
        where: {
            id: parseInt(id)
        }
    });
    console.log(result);
    res.send(result);
};

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // hash PW before storing to DB
    const result = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
    console.log(result);
    res.send(result);
};

module.exports = {
    getAllUsers,
    getIdUser,
    createUser,
};
