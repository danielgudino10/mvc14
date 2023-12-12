const router = require('express').Router();
const user = require('./user');
const macros = require('./macros');

router.use('/user', user);
router.use('/macros', macros);

module.exports = router;
