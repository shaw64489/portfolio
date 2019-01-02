import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

class About extends Component {
  render() {
    return (
      <BaseLayout>
        <BasePage>
          <h1>I am About page</h1>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default About;