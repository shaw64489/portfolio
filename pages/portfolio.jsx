import React, { Component } from 'react'
import BaseLayout from '../components/layouts/BaseLayout';
import { withRouter } from 'next/router';


class Portfolio extends Component {
  render() {
    return (
        <BaseLayout>
            <h1>
            I am Portfolio page
            </h1>
            <h2>{ this.props.router.query.title }</h2>
        </BaseLayout>
    )
  }
}

export default withRouter(Portfolio);
