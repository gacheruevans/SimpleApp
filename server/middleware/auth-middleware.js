'user strict'
const { Users, AuthToken } = require('../models');

module.exports = (req, res, next) => {

    // look for an authorization header or auth_token in the cookies
    const token = req.cookies.auth_token || req.headers.authorization;
  
    // if a token is found find it's associated user then attach it to the req object so any
    // following middleware or routing logic will have access to
    // the authenticated user.
    if (token) {
      
      // look for an auth token that matches the cookie or header
      const authToken = AuthToken.find(
        { where: { token }, include: Users }
      );
  
      // if there is an auth token found, we attach it's associated
      // user to the req object so we can use it in our routes
      if (authToken) {
        req.user = authToken.Users;
      }
    }
    next();
  };