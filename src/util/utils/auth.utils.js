const jwt = require('./jwt.utils');
/* const {
  respond,
  HTTPError, // HTTPSuccess, HTTPRedirect,
} = require('./respond.util'); */

const user = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.error(token);
    req.context = {
      ...req.context,
      user: await jwt.verify(token),
    };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.sendStatus(401).error('Unauthorized');
      // return respond(HTTPError(401, 'Unauthorized'), res);
    }
    res.json({ error });
    // respond(error, res);
  }
};

module.exports.user = user;
