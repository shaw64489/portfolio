import React, { Component, Fragment } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import axios from 'axios';

// Class component
// More functionality, Use lifecycle functions etc..
class Index extends Component {

  static async getInitialProps() {

    let userData = {};

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
       userData = response.data;
    } catch (err) {
      console.log(err);
    }

    return { userData };
  }

  constructor(props) {

    super(props);

    this.state = {
      title: 'I am index page'
    }

  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  updateTitle = () =>  {
    this.setState({title: 'I am updated index page'});
  }

  render() {

    const { title } = this.state;
    const { userData } = this.props;

    return (
      <BaseLayout>
        <h1>I am Index page from React Component</h1>
        <h2>{ title }</h2>
        <h2>{ userData.title }</h2>
        <button onClick={ this.updateTitle }>Change title</button>
      </BaseLayout>
    );
  }
}

export default Index;
