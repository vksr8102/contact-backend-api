const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/accessTokenHandler");
const router = express.Router();


router.use("/register",registerUser)

router.post("/login",loginUser)
router.get("/current",validateToken,currentUser)

module.exports =router;