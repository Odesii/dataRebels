const router = require('express').Router();
const { User, Character, Enemy, Game } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth,  async (req, res) => {
if(req.session.loggedIn){
    
    const userData = await User.findByPk( req.session.user_id,
       {
        include: 
        [{
        model: Character
    }] 
});
    const {character} = userData.get({plain: true})
console.log('home route', character)
return res.render('homepage', {character, loggedIn: req.session.loggedIn })
}

    res.render('homepage', {loggedIn: req.session.loggedIn })
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