const router = require('express').Router();
const Auth = require('../controller/Auth')

router.post("/signup",Auth.signup)


module.exports = router;