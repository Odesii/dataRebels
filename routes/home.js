const router = require('express').Router();
const { User, Character, Enemy, Game, Item, UserItem } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth,  async (req, res) => {
    if(req.session.loggedIn) {

        const userData = await User.findByPk( req.session.user_id, {
            include: 
            [{
                model: Character
            }] 
        });

        const findUserInventory = await UserItem.findOne({
            where: {
                user_id: req.session.user_id
            }
        })
        
        if (!findUserInventory) {
            const itemData = await Item.findAll({});

            const userItemData = itemData.map((item) => UserItem.create({
                item_id: item.id,
                user_id: req.session.user_id,
                cost: item.cost,
                quantity: 0
            }))
            await Promise.all(userItemData);
        }

        const enemyData = [];
        for (let i = 0; i < userData.highest_level; i++) {
            enemyData.push(await Enemy.findOne({
                where: {
                    id: i + 1
                },
                raw: true
            }));
        }

        const user = userData.get({ plain: true });
        const { character } = userData.get({ plain: true })

        return res.render('homepage', { user, character, enemyData, loggedIn: req.session.loggedIn })
    }

    res.render('homepage', { loggedIn: req.session.loggedIn })
})

router.get('/play', withAuth, async (req, res) => {
    const gameData = await Game.findOne({
        where: {
            user_id: req.session.user_id,
        }
    })

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

    const enemyData = await Enemy.findOne({
        where: {
            id: gameData.enemy_id
        }
    });

    const game = gameData.get({ plain: true });
    const user = userData.get({ plain: true });
    const character = characterData.get({ plain: true });
    const enemy = enemyData.get({ plain: true });
    
    res.render('play', { game, user, character, enemy, loggedIn: req.session.loggedIn })
});

router.get('/gameover', async (req, res) => {
    try {
        res.render('gameover');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/shop', withAuth, async (req, res) => {
    try {
        const itemData = await Item.findAll({ raw: true });

        const userItemData = await UserItem.findAll({
            where: {
                user_id: req.session.user_id
            },
            raw: true,
            order: [['item_id', 'ASC']]
        });

        const userData = await User.findOne({
            where: {
                id: req.session.user_id
            }
        });
        
        const user = userData.get({ plain: true })
        res.render('shop', { user, itemData, userItemData, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/register', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // Otherwise, render the 'login' template
    res.render('register');
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
});

module.exports = router;