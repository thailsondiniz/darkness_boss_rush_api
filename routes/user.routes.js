const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.get("/:userId", (req, res) => userController.getUser(req, res));
router.get("/", (req, res) => userController.getAllUsers(req, res));
router.post("/:userId/xp", (req, res) => userController.addXP(req, res));
router.post("/:userId/boss-history", (req, res) => userController.addBossHistory(req, res));
router.put("/:userId", (req, res) => userController.updateUser(req, res));
router.delete("/:userId", (req, res) => userController.deleteUser(req, res));

module.exports = router;