let express = require("express");
let userController = require("./../controllers/userController")
let router = express.Router();
router
.route("/")
.get(userController.getAllUsers)
.post(userController.createUser);

router
.route("/:id")
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;