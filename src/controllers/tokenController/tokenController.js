const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../../models/user");

module.exports = {
  async handle(request, response) {
    const { email, password } = request.body;
    //caso não tenha recebido email ou password do body, é exibido um erro!
    if (!email || !password) {
      return response.status(401).json({
        message: ["Credencias inválidas!"],
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return response.status(400).json({ message: "Email não encontrado!" });
    }

    //uma função para validação de senha
    //comparo se a senha que veio do body é a mesma que está salva no banco.
    const passwordIsValid = (password) => {
      return bcryptjs.compare(password, user.password_hash);
    };

    //se não for válida é retornado um erro
    if (!(await passwordIsValid(password))) {
      return response.json({ error: "Senha inválida!" });
    }

    const { id, permission } = User;
    const token = jwt.sign(
      { id, email, permission },
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );

    return response.json({ token });
  },
};
