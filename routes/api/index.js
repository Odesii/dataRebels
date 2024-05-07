const router = require('express').Router();
const userRoutes = require('./userRoutes');
const enemyRoutes = require('./enemyRoutes');
const gameRoutes = require('./gameRoutes');

router.use('/users', userRoutes);
router.use('/enemies', enemyRoutes);
router.use('/games', gameRoutes);

module.exports = router;