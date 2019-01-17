import React from 'react';
import App, { Container } from 'next/app';
import auth0 from '../services/auth0';

//Stylings
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';

const nameSpace = 'http://localhost:3000';

export default class MyApp extends App {

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    //check if being run on client or server
    const user = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(ctx.req);


    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    //check for user & role
    const isSiteOwner = user && user[nameSpace + '/role'] === 'siteOwner';
    const auth = { user, isAuthenticated: !!user, isSiteOwner };

    return { pageProps, auth }
  }

  render () {
    const { Component, pageProps, auth } = this.props

    return (
      <Container>
        <Component {...pageProps} auth={auth}/>
      </Container>
    )
  }
}