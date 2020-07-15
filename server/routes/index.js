const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

// welcome page
router.get('/', (req, res) => {
    // render welcome page
})

//dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    //  render dashboard for user in req
    res.send({
        name: req.user.name
    })
});

module.exports = router;