const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes');
const characterRoutes = require('./characterRoutes');
const enemyRoutes = require('./enemyRoutes');

router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/character', characterRoutes);
router.use('/enemy', enemyRoutes);

module.exports = router;