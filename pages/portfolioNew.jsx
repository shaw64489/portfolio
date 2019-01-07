import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortfolioCreateForm from '../components/portfolios/PortfolioCreateForm';

import withAuth from '../components/hoc/withAuth';



class PortfolioNew extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="portfolio-create-page" title="Create New Portfolio">
        <PortfolioCreateForm />
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(PortfolioNew);
