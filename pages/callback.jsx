import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import authClient from '../services/auth0';
import { withRouter } from 'next/router';

class Callback extends Component {

    async componentDidMount() {
        //wait until auth0 promise is resolved
        await authClient.handleAuthentication();
        // go to homepage
        this.props.router.push('/');
    }

  render() {
    return (
      <BaseLayout>
        <BasePage>
          <h1>Verifying login data...</h1>
        </BasePage>
      </BaseLayout>
    );
  }
}

// to use redirect functionality - withRouter
export default withRouter(Callback);
