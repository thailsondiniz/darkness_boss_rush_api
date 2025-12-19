const express = require("express");
const bossController = require("../controller/bossController");
const router = express.Router();

router.post("/", (req, res) => bossController.createBoss(req, res));
router.get("/", (req, res) => bossController.getAllBosses(req, res));
router.get("/active", (req, res) => bossController.getActiveBosses(req, res));
router.get("/:bossId", (req, res) => bossController.getBoss(req, res));
router.post("/:bossId/damage", (req, res) => bossController.registerDamage(req, res));
router.post("/:bossId/reset", (req, res) => bossController.resetBoss(req, res));
router.put("/:bossId", (req, res) => bossController.updateBoss(req, res));
router.delete("/:bossId", (req, res) => bossController.deleteBoss(req, res));

module.exports = router;