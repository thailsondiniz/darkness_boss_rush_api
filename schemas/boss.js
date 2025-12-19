const mongoose = require("mongoose");

const bossSchema = new mongoose.Schema({
  name: { type: String, required: true },
  health: { type: Number, required: true },
  phrases: { type: [String], required: true },
  imageBoss: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  lastHit: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Boss", bossSchema);;
