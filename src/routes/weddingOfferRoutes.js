const express = require('express');
const router = express.Router();
const weddingOfferController = require('../controllers/weddingOfferController');

router.get('/', weddingOfferController.getAllWeddingOffers); //get all data
router.get('/:userId/:id', weddingOfferController.getIdWeddingOffer); // get specific data
router.post('/', weddingOfferController.createWeddingOffer); // store new data
router.put('/:userId/:id', weddingOfferController.updateWeddingOffer); // update existing data
router.delete('/:userId/:id', weddingOfferController.deleteWeddingOffer); // delete data
// Add other user routes as needed

module.exports = router;