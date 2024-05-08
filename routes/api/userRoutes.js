const router = require('express').Router();
const { User, Character } = require('../../models');

router.put('/roll', async (req, res) => {
    try {
        const characters = await Character.findAll({});

        const userData = await User.update(
            {
                character_id: characters[Math.floor(Math.random() * characters.length)].id
            },
            {
                where: {
                    id: req.session.user_id,  //checks to see if character is assigned to correct user
                },
            }
        );

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
              username: req.body.username,
            },
        });
      
        if (userData) {
            res
              .status(400)
              .json({ message: 'Username in use. Please try again!' });
            return;
        }

        else {
            const newUserData = await User.create({
                username: req.body.username,
                password: req.body.password,
            });
                    req.session.save(() => {
            req.session.user_id = newUserData.id;
            req.session.loggedIn = true;
            
            res.json({ user: newUserData, message: 'You are now logged in!' });
        })
            // res.status(200).json(newUserData);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;