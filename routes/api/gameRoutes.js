const router = require('express').Router();
const { User, Character, Enemy, Game } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => { //gets specific game
    try {
        const gameData = await Game.findOne({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(gameData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const gameData = await Game.findOne({
            where: {
                user_id: req.session.user_id
            }
        });

        if(gameData) {

           return res.status(200).json(gameData);
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

        const newGame = await Game.create({//created new row with chosen data
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

router.put('/:id', withAuth, async (req, res) => {
    try {
    console.log(req.body)
        // 1. enemy_hp, action_take
        if (req.body.enemy_hp && req.body.action_taken) {
            const updateGame = await Game.update(
                {
                    enemy_hp: req.body.enemy_hp,
                    action_taken: req.body.action_taken
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );

            res.status(200).json(updateGame);
        }

        // 2. user_defense, user_ap, action_taken
        else if (req.body.user_defense && req.body.user_ap &&req.body.action_taken) {
            const updateGame = await Game.update(
                {
                    user_defense: req.body.user_defense,
                    user_ap: req.body.user_ap,
                    action_taken: req.body.action_taken
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );

            res.status(200).json(updateGame);
        }

        // 3. action_taken, user_defense, enemy_defense, turn
        else if (req.body.action_taken!=undefined && req.body.turn) {
            console.log("this is game routes action and turn")
            const updateGame = await Game.update(
                {
                    action_taken: req.body.action_taken,
                    turn: req.body.turn
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );

            res.status(200).json(updateGame);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;