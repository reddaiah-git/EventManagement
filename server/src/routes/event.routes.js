const router = require("express").Router();
const c = require("../controllers/event.controller");

router.get("/search", c.search);

module.exports = router;
