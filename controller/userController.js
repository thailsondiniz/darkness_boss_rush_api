const userService = require("../services/userService");

class UserController {
  // Registrar novo usuário
  async register(req, res) {
    try {
      const { username, password, email, avatar } = req.body;

      // Validações básicas
      if (!username || !password || !email) {
        return res.status(400).json({
          message: "Username, password e email são obrigatórios",
        });
      }

      const newUser = await userService.createUser({
        username,
        password,
        email,
        avatar,
      });

      return res.status(201).json({
        message: "Usuário registrado com sucesso",
        userId: newUser._id,
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          avatar: newUser.avatar,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Erro ao registrar usuário",
      });
    }
  }

  // Login do usuário
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          message: "Username e password são obrigatórios",
        });
      }

      const user = await userService.authenticateUser(username, password);

      return res.status(200).json({
        message: "Login bem-sucedido",
        userId: user._id,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          level: user.level,
          xp: user.xp,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      return res.status(401).json({
        message: error.message || "Erro ao fazer login",
      });
    }
  }

  // Obter dados do usuário
  async getUser(req, res) {
    try {
      const { userId } = req.params;

      const user = await userService.getUserById(userId);

      return res.status(200).json({
        message: "Usuário encontrado",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          level: user.level,
          xp: user.xp,
          xpToNextLevel: user.xpToNextLevel,
          baseDamage: user.baseDamage,
          ranking: user.ranking,
          bossHistory: user.bossHistory,
        },
      });
    } catch (error) {
      return res.status(404).json({
        message: error.message || "Usuário não encontrado",
      });
    }
  }

  // Listar todos os usuários
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();

      return res.status(200).json({
        message: "Usuários recuperados com sucesso",
        count: users.length,
        users: users,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Erro ao listar usuários",
      });
    }
  }

  // Adicionar XP ao usuário
  async addXP(req, res) {
    try {
      const { userId } = req.params;
      const { xpAmount } = req.body;

      if (!xpAmount || xpAmount <= 0) {
        return res.status(400).json({
          message: "XP amount deve ser maior que 0",
        });
      }

      const user = await userService.addXP(userId, xpAmount);

      return res.status(200).json({
        message: "XP adicionado com sucesso",
        user: {
          level: user.level,
          xp: user.xp,
          xpToNextLevel: user.xpToNextLevel,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Erro ao adicionar XP",
      });
    }
  }

  // Adicionar boss ao histórico
  async addBossHistory(req, res) {
    try {
      const { userId } = req.params;
      const bossData = req.body;

      const user = await userService.addBossToHistory(userId, bossData);

      return res.status(200).json({
        message: "Boss adicionado ao histórico",
        bossHistory: user.bossHistory,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Erro ao adicionar boss ao histórico",
      });
    }
  }

  // Atualizar usuário
  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const updateData = req.body;

      const user = await userService.updateUser(userId, updateData);

      return res.status(200).json({
        message: "Usuário atualizado com sucesso",
        user: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Erro ao atualizar usuário",
      });
    }
  }

  // Deletar usuário
  async deleteUser(req, res) {
    try {
      const { userId } = req.params;

      await userService.deleteUser(userId);

      return res.status(200).json({
        message: "Usuário deletado com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Erro ao deletar usuário",
      });
    }
  }
}

module.exports = new UserController();
