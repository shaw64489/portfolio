import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';
import { Row, Col } from 'reactstrap';

import withAuth from '../components/hoc/withAuth';

class PortfolioNew extends Component {

    constructor(props) {
        super();

        this.savePortfolio = this.savePortfolio.bind(this);
    }

  savePortfolio(portfolioValues) {
    alert(JSON.stringify(portfolioValues, null, 2));
  }

  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage
          className="portfolio-create-page"
          title="Create New Portfolio"
        >
          <Row>
            <Col md="6">
              <PortfolioCreateForm onSubmit={this.savePortfolio} />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(PortfolioNew);
