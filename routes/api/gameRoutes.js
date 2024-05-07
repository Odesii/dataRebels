const router = require('express').Router();
const { User, Character, Enemy, Game } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const gameData = await Game.findOne({
            where: {
                user_id: req.session.user_id
            }
        });

        if(gameData) {
            res.status(500).json(err);
        }

        const userData = await User.findOne({
            where: {
                id: req.session.user_id
            }
        });

        const characterData = await Character.findOne({
            where: {
                id: userData.character_id
            }
        });

        const enemies = await Enemy.findAll({});
        const enemyData = await Enemy.findOne({
            where: {
                id: enemies[Math.floor(Math.random() * enemies.length)].id
            }
        });

        const newGame = await Game.create({
            user_id: req.session.user_id,
            enemy_id: enemyData.id,
            user_hp: characterData.hp,
            user_defense: characterData.defense,
            user_ap: characterData.ap,
            enemy_hp: enemyData.hp,
            enemy_ap: enemyData.ap,
            enemy_defense: enemyData.defense,
            action_taken: false,
            turn: 0
        });
  
        res.status(200).json(newGame);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;