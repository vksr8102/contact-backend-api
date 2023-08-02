const express = require("express");
const { getContacts, postContact, updateContact, deleteContact, getContact } = require("../controllers/contacontroller");
const validateToken = require("../middleware/accessTokenHandler");

const router = express.Router();
router.use(validateToken);
router.route("/").get(getContacts).post(postContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;