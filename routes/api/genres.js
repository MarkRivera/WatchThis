const express = require("express");
const router = express.Router();
const config = require('config');

router.get('/', async (req, res) => {
  const genres = await config.get('genres');

    try {
        res.json(genres);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



module.exports = router;