const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes');
const characterRoutes = require('./characterRoutes');
const enemyRoutes = require('./enemyRoutes');
const itemRoutes = require('./itemRoutes');

router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/character', characterRoutes);
router.use('/enemy', enemyRoutes);
router.use('/items', itemRoutes);

module.exports = router;