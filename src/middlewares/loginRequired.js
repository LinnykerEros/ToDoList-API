const jwt = require("jsonwebtoken");

module.exports = {
  async loginRequired(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
      return response.status(401).json({
        message: ["Login Required"],
      });
    }
    const [, token] = authorization.split(" ");
    try {
      const dados = jwt.verify(token, process.env.TOKEN_SECRET);
      const { id, email } = dados;
      request.userId = id;
      request.userEmail = email;
      return next();
    } catch (err) {
      return response.status(401).json({
        message: ["Token expirado ou inválido!"],
      });
    }
  },
};
