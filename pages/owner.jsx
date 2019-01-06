import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import withAuth from '../components/hoc/withAuth';

class Owner extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>I am Owner page</h1>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth('siteOwner')(Owner);
