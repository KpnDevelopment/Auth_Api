const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    // res.json({ posts: { title: "first post", desc: "this is my first post" } })
    res.send(req.user);


})



module.exports = router;