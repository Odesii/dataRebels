const router = require('express').Router();

router.get('/',  async (req, res) => {
    res.render('homepage')
})

router.get('/register', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    // Otherwise, render the 'login' template
    res.render('register');
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
});

module.exports = router;