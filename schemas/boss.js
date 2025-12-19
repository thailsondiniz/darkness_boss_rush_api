const mongoose = require("mongoose");

const bossSchema = new mongoose.Schema({
  name: { type: String, required: true },
  maxHealth: { type: Number, required: true },
  health: { type: Number, required: true },
  phrases: { type: [
    {
        text: String,
        triggerPercentage: Number
    }
  ], required: true },
  imageBoss: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  defeated: { type: Boolean, default: false },
  lastHitUserId: { type: String, default: null },
  topDamage: {
    type: [
      {
        userId: String,
        name: String,
        damage: Number,
      },
    ],
    default: [],
  },
  participants: {
    type: [
      {
        userId: String,
        name: String,
        damage: Number,
        clicks: Number,
      },
    ],
    default: [],
  },
  totalParticipants: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Boss", bossSchema);
