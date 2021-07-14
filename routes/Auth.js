const router = require('express').Router();
const Auth = require('../controller/Auth')

router.post("/signup",Auth.signup)

router.post("/login",Auth.login)

router.post("/refresh",Auth.refershToken)

module.exports = router;