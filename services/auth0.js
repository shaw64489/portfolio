// src/Auth/Auth.js

import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import { getCookieFromReq } from '../helpers/utils';
const CLIENT_ID = process.env.CLIENT_ID;

class Auth0 {
  accessToken;
  idToken;
  expiresAt;

  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'shaw64489.auth0.com',
      clientID: CLIENT_ID,
      redirectUri: `${process.env.BASE_URL}/callback`,
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.logout = this.logout.bind(this);
    //this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject(err);
          console.log(err);
        }
      });
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    Cookies.set('jwt', authResult.idToken);
  }

  logout() {
    Cookies.remove('jwt');

    this.auth0.logout({
      returnTo: process.env.BASE_URL,
      clientID: CLIENT_ID
    });
  }

  login() {
    this.auth0.authorize();
  }

  //   isAuthenticated() {
  //     // Check whether the current time is past the
  //     // access token's expiry time
  //     const expiresAt = Cookies.getJSON('expiresAt');
  //     return new Date().getTime() < expiresAt;
  //   }

  // get jw key set
  async getJWKS() {
    // store jwkey set - need to extract from res
    const res = await axios.get(
      'https://shaw64489.auth0.com/.well-known/jwks.json'
    );

    //extract
    const jwks = res.data;

    return jwks;
  }

  async verifyToken(token) {
    if (token) {
      //decode token - complete to access header parameter
      const decodedToken = jwt.decode(token, { complete: true });

      if (!decodedToken) {
        return undefined;
      }

      const jwks = await this.getJWKS();
      const jwk = jwks.keys[0];

      // BUILD CERTIFICATE
      //extract certificate
      let cert = jwk.x5c[0];
      //match reg exp
      //join elements of array (64 string chars) with new line
      cert = cert.match(/.{1,64}/g).join('\n');
      //create new string with certificate
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

      //check if jwk key id is same as decoded token
      if (jwk.kid === decodedToken.header.kid) {
        try {
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;

          return verifiedToken && new Date().getTime() < expiresAt
            ? verifiedToken
            : undefined;
        } catch (err) {
          return undefined;
        }
      }
    }
    return undefined;
  }

  //client side authentication
  async clientAuth() {
    const token = Cookies.getJSON('jwt');
    const verifiedToken = await this.verifyToken(token);
    
    return verifiedToken;
  }

  async serverAuth(req) {
    if (req.headers.cookie) {
      
      const token = getCookieFromReq(req, 'jwt');
      const verifiedToken = await this.verifyToken(token);

      return verifiedToken;
    }
    return undefined;
  }
}

const authClient = new Auth0();

export default authClient;
