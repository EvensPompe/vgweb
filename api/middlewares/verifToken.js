function verifToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader === 'undefined') {
    res.sendStatus(403)
  } else {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next()
  }
}

module.exports = verifToken;
