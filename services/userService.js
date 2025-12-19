const User = require("../schemas/user");
const bcrypt = require("bcrypt");

class UserService {
  // Criar novo usuário
  async createUser(userData) {
    try {
      const { username, password, email, avatar } = userData;

      // Verificar se usuário já existe
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        throw new Error("Usuário ou email já cadastrado");
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        avatar,
      });

      await newUser.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuário por ID
  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuário por username
  async getUserByUsername(username) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Autenticar usuário
  async authenticateUser(username, password) {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("Usuário ou senha inválidos");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Usuário ou senha inválidos");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Listar todos os usuários
  async getAllUsers() {
    try {
      const users = await User.find().select("-password");
      return users;
    } catch (error) {
      throw error;
    }
  }

  // Atualizar usuário
  async updateUser(userId, updateData) {
    try {
      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Adicionar XP ao usuário
  async addXP(userId, xpAmount) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      user.xp += xpAmount;

      // Verificar level up
      while (user.xp >= user.xpToNextLevel) {
        user.xp -= user.xpToNextLevel;
        user.level += 1;
        user.xpToNextLevel = Math.floor(user.xpToNextLevel * 1.5);
      }

      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Adicionar boss ao histórico
  async addBossToHistory(userId, bossData) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      user.bossHistory.push(bossData);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Deletar usuário
  async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
