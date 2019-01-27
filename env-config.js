
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BASE_URL': prod ? 'https://chrisshaw.herokuapp.com' : 'http://localhost:3000',
  'process.env.NAMESPACE': 'https://chrisshaw.herokuapp.com',
  'process.env.CLIENT_ID': 'hjyUjniJ7vjHUU4wehG2SsHoSPYsLW10'
}