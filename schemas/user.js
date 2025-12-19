const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: false },
    level: { type: Number, default: 1 },
    xpToNextLevel: { type: Number, default: 100 },
    xp: { type: Number, default: 0 },
    bossHistory: { type: [
        { 
            bossId: String,
            name: String,
            participated: Boolean,
            damage: Number,
            clicks: Number,
            lastHit: Boolean,
            damageDealt: Number, 
            defeatedAt: Date 
        }
    ], default: [] },
    baseDamage: { type: Number, default: 1},
    createdAt: { type: Date, default: Date.now },
    ranking: { type: Number, default: 0 }
});


module.exports = mongoose.model('User', User);
