import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Link } from '../routes';
import { Col, Row, Button } from 'reactstrap';
import PortfolioCard from '../components/portfolios/PortfolioCard';

import { Router } from '../routes';

// ACTIONS
import { getPortfolios, deletePortfolio } from '../actions';

class Portfolios extends Component {
  static async getInitialProps() {
    let portfolios = [];

    try {
      // get portfolios from request
      portfolios = await getPortfolios();
    } catch (err) {
      console.error(err);
    }

    return { portfolios: portfolios.splice(0, 10) };
  }

  displayDeleteWarning(portfolioId) {
    const isConfirm = confirm('Are you sure you want to delete portfolio?');

    if (isConfirm) {
      // delete portfolio
      this.deletePortfolio(portfolioId);
    }
  }

  deletePortfolio(portfolioId) {
    deletePortfolio(portfolioId)
      .then(() => {
        // Redirect to same page for update
        Router.pushRoute('/portfolios');
      })
      .catch(err => console.error(err));
  }

  // iterate over all portfolios to return and display each portfolio card
  renderPortfolios(portfolios) {
    //get prop to check if user is authenticated & site owner
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return portfolios.map((portfolio, index) => {
      return (
        <Col md="4" key={index}>
          <PortfolioCard portfolio={portfolio}>
            {isAuthenticated && isSiteOwner && (
              <React.Fragment>
                <Button
                  onClick={() =>
                    Router.pushRoute(`/portfolios/${portfolio._id}/edit`)
                  }
                  color="warning"
                >
                  Edit
                </Button>
                {'  '}
                <Button
                  onClick={() => this.displayDeleteWarning(portfolio._id)}
                  color="danger"
                >
                  Delete
                </Button>
              </React.Fragment>
            )}
          </PortfolioCard>
        </Col>
      );
    });
  }

  render() {
    const { portfolios } = this.props;
    //get prop to check if user is authenticated
    const { isAuthenticated, isSiteOwner } = this.props.auth;

    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-page" title="Portfolios">
          {isAuthenticated && isSiteOwner && (
            <Button
              onClick={() => Router.pushRoute('/portfolioNew')}
              color="success"
              className="create-port-btn"
            >
              Create Portfolio
            </Button>
          )}
          <Row>{this.renderPortfolios(portfolios)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolios;
