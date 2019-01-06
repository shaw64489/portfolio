const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

//MIDDLEWARE
//checking token validity
//similar to auth0 verifyToken
exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 15,
    jwksUri: 'https://shaw64489.auth0.com/.well-known/jwks.json'
  }),
  //auth0 ID
  audience: 'hjyUjniJ7vjHUU4wehG2SsHoSPYsLW10',
  //auth0 domain
  issuer: 'https://shaw64489.auth0.com/',
  algorithms: [ 'RS256' ]
});
