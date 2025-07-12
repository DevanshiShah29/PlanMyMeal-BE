const express = require("express");
const router = express.Router();
const { getItems, createItem, updateItem, deleteItem } = require("../controllers/itemController");

// Each route (like GET or POST) points to a specific function (called a controller).
router.route("/").get(getItems).post(createItem);
router.route("/:id").put(updateItem).delete(deleteItem);

module.exports = router;
