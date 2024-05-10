const router = require('express').Router();
const { User, Character, Enemy, Game, UserItem } = require('../../models');
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

router.post('/:id', withAuth, async (req, res) => {
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

        const userLevel = userData.highest_level;

        const characterData = await Character.findOne({
            where: {
                id: userData.character_id
            }
        });

        const enemyDataList = await Enemy.findAll({});
        const enemyData = await Enemy.findOne({
            where: {
                id: req.params.id
            }
        });

        const userItemData = await UserItem.findAll({
            where: {
                user_id: req.session.user_id
            },
            raw: true,
            order: [['item_id', 'ASC']]
        });

        if (userLevel < 6) {
            const newGame = await Game.create({//created new row with chosen data
                user_id: req.session.user_id,
                enemy_id: enemyData.id,
                user_hp: characterData.hp + userItemData[0].quantity * 3,
                user_attack: characterData.attack + userItemData[1].quantity,
                user_defense: characterData.defense + userItemData[2].quantity,
                user_ap: characterData.ap + userItemData[3].quantity * 2,
                user_ap_img: "/imgs/UI/ap/ap15.png",
                enemy_hp: enemyData.hp,
                enemy_ap: enemyData.ap,
                enemy_defense: enemyData.defense,
                action_taken: false,
                turn: 0
            });

            res.status(200).json(newGame);
        }
        
        else {
            const newGame = await Game.create({//created new row with chosen data
                user_id: req.session.user_id,
                enemy_id: enemyDataList[Math.floor(Math.random() * enemyDataList.length)].id,
                user_hp: characterData.hp + userItemData[0].quantity * 3,
                user_attack: characterData.attack + userItemData[1].quantity,
                user_defense: characterData.defense + userItemData[2].quantity,
                user_ap: characterData.ap + userItemData[3].quantity * 2,
                user_ap_img: "/imgs/UI/ap/ap15.png",
                enemy_hp: enemyData.hp,
                enemy_ap: enemyData.ap,
                enemy_defense: enemyData.defense,
                action_taken: false,
                turn: 0
            });

            res.status(200).json(newGame);
        }
        
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        // const { enemy_hp, action_taken, user_hp,
        //     user_defense, user_ap, enemy_defense,
        //     enemy_ap, turn } = req.body;
        // 1. enemy_hp, action_take
        if (req.body.enemy_hp != undefined && req.body.action_taken) {
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
        else if (req.body.user_defense && req.body.user_ap && req.body.action_taken) {
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
        else if (req.body.action_taken != undefined && req.body.turn) {//!= was used because it is a boolean and makes sure that the required field is there 
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

        else if(req.body.user_hp != undefined) {
            const updateGame=await Game.update(
                {
                    user_hp: req.body.user_hp
                },
                {
                where:{
                        id: req.params.id
                    }
                }
            )

            res.status(200).json(updateGame);
        }

        else if(req.body.enemy_defense && req.body.enemy_ap) {
            const updateGame=await Game.update(
                {
                    enemy_defense: req.body.enemy_defense,
                    enemy_ap:req.body.enemy_ap
                },
                {
                where:{
                    id: req.params.id
                }
                }
            )

            res.status(200).json(updateGame);
        }

        else if(req.body.user_defense) {
            const updateGame=await Game.update(
                {
                    user_defense: req.body.user_defense
                },
                {
                where:{
                    id: req.params.id
                }
                }
            )

            res.status(200).json(updateGame);
        }

        else if(req.body.enemy_defense) {
            const updateGame=await Game.update(
                {
                    enemy_defense: req.body.enemy_defense
                },
                {
                where:{
                    id: req.params.id
                }
                }
            )

            res.status(200).json(updateGame);
        }

        else if(req.body.enemy_hp !=undefined) {//1= undefined because 0 is a falsy value and it wont register
            const updateGame=await Game.update(
                {
                    enemy_hp:req.body.enemy_hp
                },
                {
                    where:{
                        id:req.params.id
                    }
                }
            );
   
            res.status(200).json(updateGame);
        }

        else if (req.body.user_ap_img) {
            const img = renderBandwith(req.body.user_ap_img);
            const updateGame = await Game.update(
                {
                    user_ap_img: img
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )

            res.status(200).json(updateGame);
        }
        
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const gameData = await Game.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(gameData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;