const Boss = require("../schemas/boss");

class BossService {
  // Criar novo boss
  async createBoss(bossData) {
    try {
      const { name, maxHealth, phrases, imageBoss, backgroundImage } = bossData;

      // Verificar se boss já existe
      const existingBoss = await Boss.findOne({ name });
      if (existingBoss) {
        throw new Error("Boss com este nome já existe");
      }

      const newBoss = new Boss({
        name,
        maxHealth,
        health: maxHealth,
        phrases,
        imageBoss,
        backgroundImage,
      });

      await newBoss.save();
      return newBoss;
    } catch (error) {
      throw error;
    }
  }

  // Buscar boss por ID
  async getBossById(bossId) {
    try {
      const boss = await Boss.findById(bossId);
      if (!boss) {
        throw new Error("Boss não encontrado");
      }
      return boss;
    } catch (error) {
      throw error;
    }
  }

  // Listar todos os bosses
  async getAllBosses() {
    try {
      const bosses = await Boss.find();
      return bosses;
    } catch (error) {
      throw error;
    }
  }

  // Buscar bosses não derrotados
  async getActiveBosses() {
    try {
      const bosses = await Boss.find({ defeated: false });
      return bosses;
    } catch (error) {
      throw error;
    }
  }

  // Registrar dano do usuário
  async registerDamage(bossId, userId, userName, damageAmount) {
    try {
      const boss = await Boss.findById(bossId);
      if (!boss) {
        throw new Error("Boss não encontrado");
      }

      // Diminuir saúde do boss
      boss.health = Math.max(0, boss.health - damageAmount);
      boss.lastHitUserId = userId;

      // Verificar se o usuário já está nos participantes
      let participant = boss.participants.find((p) => p.userId === userId);

      if (participant) {
        participant.damage += damageAmount;
        participant.clicks += 1;
      } else {
        boss.participants.push({
          userId,
          name: userName,
          damage: damageAmount,
          clicks: 1,
        });
        boss.totalParticipants += 1;
      }

      // Atualizar top damage
      this.updateTopDamage(boss);

      // Verificar se boss foi derrotado
      if (boss.health <= 0) {
        boss.defeated = true;
      }

      await boss.save();
      return boss;
    } catch (error) {
      throw error;
    }
  }

  // Atualizar top 5 de dano
  updateTopDamage(boss) {
    const topParticipants = boss.participants
      .sort((a, b) => b.damage - a.damage)
      .slice(0, 5);

    boss.topDamage = topParticipants.map((p) => ({
      userId: p.userId,
      name: p.name,
      damage: p.damage,
    }));
  }

  // Atualizar boss
  async updateBoss(bossId, updateData) {
    try {
      const boss = await Boss.findByIdAndUpdate(bossId, updateData, {
        new: true,
      });
      if (!boss) {
        throw new Error("Boss não encontrado");
      }
      return boss;
    } catch (error) {
      throw error;
    }
  }

  // Resetar saúde do boss
  async resetBossHealth(bossId) {
    try {
      const boss = await Boss.findById(bossId);
      if (!boss) {
        throw new Error("Boss não encontrado");
      }

      boss.health = boss.maxHealth;
      boss.defeated = false;
      boss.lastHitUserId = null;
      boss.participants = [];
      boss.topDamage = [];
      boss.totalParticipants = 0;

      await boss.save();
      return boss;
    } catch (error) {
      throw error;
    }
  }

  // Deletar boss
  async deleteBoss(bossId) {
    try {
      const boss = await Boss.findByIdAndDelete(bossId);
      if (!boss) {
        throw new Error("Boss não encontrado");
      }
      return boss;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BossService();
