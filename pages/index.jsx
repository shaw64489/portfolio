import React, { Component, Fragment } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';

// Class component
// More functionality, Use lifecycle functions etc..
class Index extends Component {
  render() {
    return (
      <BaseLayout>
        <h1>I am Index page from React Component</h1>
      </BaseLayout>
    );
  }
}

export default Index;
