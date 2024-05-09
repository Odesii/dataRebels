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
            user_ap_img: "/imgs/UI/ap/ap15.png",
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

function renderBandwith(userAp) {
    switch (userAp) {
        case 15:
            return "/imgs/UI/ap/ap15.png";
        case 14:
            return "/imgs/UI/ap/ap14.png";
        case 13:
            return "/imgs/UI/ap/ap13.png";
        case 12:
            return "/imgs/UI/ap/ap12.png";
        case 11:
            return "/imgs/UI/ap/ap11.png";
        case 10:
            return "/imgs/UI/ap/ap10.png";
        case 9:
            return "/imgs/UI/ap/ap9.png";
        case 8:
            return "/imgs/UI/ap/ap8.png";
        case 7:
            return "/imgs/UI/ap/ap7.png";
        case 6:
            return "/imgs/UI/ap/ap6.png";
        case 5:
            return "/imgs/UI/ap/ap5.png";
        case 4:
            return "/imgs/UI/ap/ap4.png";
        case 3:
            return "/imgs/UI/ap/ap3.png";
        case 2:
            return "/imgs/UI/ap/ap2.png";
        case 1:
            return "/imgs/UI/ap/ap1.png";
        case 0:
            return "/imgs/UI/ap/ap0.png";
    }
}

module.exports = router;