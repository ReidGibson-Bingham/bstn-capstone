const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');

router
    .route('/api/users')
    .post(userController.authenticateUser)

router
    .route('/api/users/favourites')
    .get(userController.getFavouriteIds)
    .post(userController.postFavouriteId)
    .delete(userController.deleteFavouriteId)

router
    .route('/api/users/searchHistory')
    .post(userController.saveSearchTerm)
    .get(userController.getSearchTerms)

module.exports = router;