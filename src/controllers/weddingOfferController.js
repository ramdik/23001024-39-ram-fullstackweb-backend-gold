const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllWeddingOffers = async (req, res) => {
    const result = await prisma.weddingOffer.findMany();
    res.send(result);
};

const createWeddingOffer = async (req, res) => {
    const { userId, weddingOfferName, weddingOfferAuthor, weddingOfferPrice, weddingOfferDescription, weddingOfferImg } = req.body;
    const result = await prisma.weddingOffer.create({
        data: {
            userId,
            weddingOfferName,
            weddingOfferAuthor,
            weddingOfferPrice: parseInt(weddingOfferPrice),
            weddingOfferDescription,
            weddingOfferImg
        }
    });
    console.log(result);
    res.send(result);
};

const updateWeddingOffer = async (req, res) => {
    const { id, userId } = req.params;
    const { weddingOfferName, weddingOfferAuthor, weddingOfferPrice, weddingOfferDescription, weddingOfferImg } = req.body;
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
    });
    console.log(result);
    res.send(result);
};

const deleteWeddingOffer = async (req, res) => {
    const { userId, id } = req.params;

    try {
        const deletedWeddingOffer = await prisma.weddingOffer.delete({
            where: {
                userId: parseInt(userId),
                id: parseInt(id),
            },
        });

        res.json({ message: 'Wedding offer deleted successfully', deletedWeddingOffer });
        console.log('Wedding offer deleted successfully');
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getIdWeddingOffer = async (req, res) => {
    const { userId, id } = req.params;
    const result = await prisma.weddingOffer.findMany({
        where: {
            userId: parseInt(userId),
            id: parseInt(id)
        }
    });
    console.log(result);
    res.send(result);
};

module.exports = {
    getAllWeddingOffers,
    createWeddingOffer,
    updateWeddingOffer,
    deleteWeddingOffer,
    getIdWeddingOffer,
    // Add other wedding offer controller functions as needed
};
