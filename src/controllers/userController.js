const { v4: uuid } = require("uuid");

const User = require("../models/user");
const bcryptjs = require("bcryptjs");
module.exports = {
  async index(request, response) {
    try {
      const users = await User.find();
      return response.status(200).json({ users });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async findById(request, response) {
    try {
      const { id } = request.params;

      const findUser = await User.findOne({ _id: id });
      if (!findUser) {
        return response.status(404).json({ error: "User not found." });
      }
      return response.status(200).json({ message: "OK", findUser });
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  },

  async store(request, response) {
    const { email, password, permission } = request.body;
    if (!email || !password) {
      return response.status(401).json({
        message: ["Por favor, informe seu email e senha!"],
      });
    }

    const newUser = new User({
      _id: uuid(),
      email,
      permission,
      password_hash: await bcryptjs.hash(password, 8),
    });
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      return response.status(400).json({ message: "This User already exist!" });
    }
    try {
      await newUser.save();
      return response
        .status(201)
        .json({ message: `Usuário cadastrado com sucesso!` });
    } catch (err) {
      response.status(400).json({ error: err.message });
    }
  },

  async update(request, response) {
    const { email, password, permission } = request.body;
    //caso o user esqueça o email ou senha
    if (!email || !password) {
      return response.status(401).json({
        message: ["Por favor, informe seu email e senha!"],
      });
    }
    //acesso a user, o que ela tem e atualizo com a que vem do body.
    if (email) {
      response.user.email = email;
    }
    if (password) {
      response.user.password_hash = await bcryptjs.hash(password, 8);
    }

    try {
      await response.user.save();
      return response
        .status(200)
        .json({ message: "User updated successfully" });
    } catch (err) {
      response.status(500).json({ error: err.message });
    }
  },

  async delete(request, response) {
    try {
      await response.user.remove();
      return response.status(200).json({ message: "User deleted succesfully" });
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  },
};
