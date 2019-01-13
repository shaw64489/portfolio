
//Models
const Portfolio = require('../models/portfolio');

// get all portfolios
exports.getPortfolios = (req, res) => {
  // find all portfolios
  Portfolio.find({}, (err, allPortfolios) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(allPortfolios);
  });
};

// add and save Portfolio
exports.savePortfolio = (req, res) => {
  const portfolioData = req.body;
  //get user data
  const userId = req.user.sub;
  const portfolio = new Portfolio(portfolioData);
  portfolio.userId = userId;

  portfolio.save((err, createdPortfolio) => {
    if (err) {
      return res.status(422).send(err);
    }

    return res.json(createdPortfolio);
  });
};

// // update a portfolio by id
// exports.updatePortfolio = (req, res) => {
//   const portfolioId = req.params.id;
//   const portfolioData = req.body;

//   Portfolio.findById(portfolioId, (err, foundPortfolio) => {
//     if (err) {
//       return res.status(422).send(err);
//     }

//     foundPortfolio.set(portfolioData);
//     foundPortfolio.save((err, savedPortfolio) => {
//       if (err) {
//         return res.status(422).send(err);
//       }

//       return res.json(savedPortfolio);
//     });
//   });
// };

// // delete a portfolio by ID
// exports.deletePortfolio = (req, res) => {
//   const portfolioId = req.params.id;

//   Portfolio.deleteOne({ _id: portfolioId }, (err, deletedportfolio) => {
//     if (err) {
//       return res.status(422).send(err);
//     }

//     return res.json({ status: 'DELETED' });
//   });
// };
