// src/Auth/Auth.js

import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

class Auth0 {

  accessToken;
  idToken;
  expiresAt;

  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'shaw64489.auth0.com',
      clientID: 'hjyUjniJ7vjHUU4wehG2SsHoSPYsLW10',
      redirectUri: 'http://localhost:3000/callback',
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
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    
    Cookies.set('user', authResult.idTokenPayload);
    Cookies.set('jwt', authResult.idToken);
    Cookies.set('expiresAt', expiresAt);
  }

  logout() {
    Cookies.remove('user');
    Cookies.remove('jwt');
    Cookies.remove('expiresAt');

    this.auth0.logout({
        returnTo: '',
        clientID: 'hjyUjniJ7vjHUU4wehG2SsHoSPYsLW10'
    })
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

    debugger;
    // store jwkey set - need to extract from res
    const res = await axios.get('https://shaw64489.auth0.com/.well-known/jwks.json');

    //extract
    const jwks = res.data;

    return jwks;
  }

  async verifyToken(token) {
      if (token) {
        const decodedToken = jwt.decode(token, { complete: true });
        //get jw ket set
        const jwks = await this.getJWKS();
        //get first key
        const jwk = jwks.keys[0];
        //build certificate
        let cert = jwk.x5c[0];
        cert = cert.match(/.{1,64}/g).join('\n');
        cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

        if (jwk.kid === decodedToken.header.kid) {
            try {
                const verifiedToken = jwt.verify(token, cert);
                const expiresAt = decodedToken.exp * 1000;

                return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;

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

        const tokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));

        if (!tokenCookie) { return undefined};

        const token = tokenCookie.split('=')[1];
        const verifiedToken = await this.verifyToken(token);

        return verifiedToken;
    }

    return undefined;
  }

}

const authClient = new Auth0();

export default authClient;
