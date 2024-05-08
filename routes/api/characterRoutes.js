const router = require('express').Router();
const { User, Character, Enemy, Game } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                // id: req.session.user_id
                id: req.params.id
            }
        });

        const characterData = await Character.findOne({
            where: {
                id: userData.character_id
            }
        });
  
        res.status(200).json(characterData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;