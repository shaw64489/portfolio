const express = require('express');
const router = express.Router();

const portfolioController = require('../controllers/portfolio');
//SERVICE
const authService = require('../services/auth');

// add a portfolio
router.post('', authService.checkJWT, authService.checkRole('siteOwner'), portfolioController.savePortfolio);

//get all Portfolios
router.get('', authService.checkJWT, authService.checkRole('siteOwner'), portfolioController.getPortfolios);

// //update Portfolio
// router.patch('/:id', portfolioController.updatePortfolio);

// //delete Portfolio
// router.delete('/:id', portfolioController.deletePortfolio);

module.exports = router;
