const bossService = require("../services/bossService");

class BossController {
  // Criar novo boss
  async createBoss(req, res) {
    try {
      const { name, maxHealth, phrases, imageBoss, backgroundImage } = req.body;

      // Validações básicas
      if (!name || !maxHealth || !phrases || !imageBoss || !backgroundImage) {
        return res.status(400).json({
          message:
            "Nome, maxHealth, frases, imageBoss e backgroundImage são obrigatórios",
        });
      }

      const newBoss = await bossService.createBoss({
        name,
        maxHealth,
        phrases,
        imageBoss,
        backgroundImage,
      });

      return res.status(201).json({
        message: "Boss criado com sucesso",
        bossId: newBoss._id,
        boss: newBoss,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Erro ao criar boss",
      });
    }
  }

  // Obter boss por ID
  async getBoss(req, res) {
    try {
      const { bossId } = req.params;

      const boss = await bossService.getBossById(bossId);

      return res.status(200).json({
        message: "Boss encontrado",
        boss: boss,
      });
    } catch (error) {
      return res.status(404).json({
        message: error.message || "Boss não encontrado",
      });
    }
  }

  // Listar todos os bosses
  async getAllBosses(req, res) {
    try {
      const bosses = await bossService.getAllBosses();

      return res.status(200).json({
        message: "Bosses recuperados com sucesso",
        count: bosses.length,
        bosses: bosses,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Erro ao listar bosses",
      });
    }
  }

  // Obter bosses ativos (não derrotados)
  async getActiveBosses(req, res) {
    try {
      const bosses = await bossService.getActiveBosses();

      return res.status(200).json({
        message: "Bosses ativos recuperados com sucesso",
        count: bosses.length,
        bosses: bosses,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Erro ao listar bosses ativos",
      });
    }
  }

  // Registrar dano ao boss
  async registerDamage(req, res) {
    try {
      const { bossId } = req.params;
      const { userId, userName, damage } = req.body;

      if (!userId || !userName || !damage || damage <= 0) {
        return res.status(400).json({
          message:
            "UserId, userName e damage (maior que 0) são obrigatórios",
        });
      }

      const boss = await bossService.registerDamage(
        bossId,
        userId,
        userName,
        damage
      );

      return res.status(200).json({
        message: "Dano registrado com sucesso",
        boss: {
          _id: boss._id,
          name: boss.name,
          health: boss.health,
          maxHealth: boss.maxHealth,
          defeated: boss.defeated,
          participants: boss.participants,
          topDamage: boss.topDamage,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Erro ao registrar dano",
      });
    }
  }

  // Resetar saúde do boss
  async resetBoss(req, res) {
    try {
      const { bossId } = req.params;

      const boss = await bossService.resetBossHealth(bossId);

      return res.status(200).json({
        message: "Boss resetado com sucesso",
        boss: {
          _id: boss._id,
          name: boss.name,
          health: boss.health,
          maxHealth: boss.maxHealth,
          defeated: boss.defeated,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Erro ao resetar boss",
      });
    }
  }

  // Atualizar boss
  async updateBoss(req, res) {
    try {
      const { bossId } = req.params;
      const updateData = req.body;

      const boss = await bossService.updateBoss(bossId, updateData);

      return res.status(200).json({
        message: "Boss atualizado com sucesso",
        boss: boss,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Erro ao atualizar boss",
      });
    }
  }

  // Deletar boss
  async deleteBoss(req, res) {
    try {
      const { bossId } = req.params;

      await bossService.deleteBoss(bossId);

      return res.status(200).json({
        message: "Boss deletado com sucesso",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Erro ao deletar boss",
      });
    }
  }
}

module.exports = new BossController();
