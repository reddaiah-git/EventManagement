const router = require("express").Router();
const protect = require("../middleware/protect");
const c = require("../controllers/registration.controller");

router.post("/", protect, c.register);


module.exports = router;
