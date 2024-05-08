const router = require('express').Router();
const { User, Character, Enemy, Game } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
    try {
        const enemyData = await Enemy.findOne({
            where: {
                id: req.params.id
            }
        });
  
        res.status(200).json(enemyData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;