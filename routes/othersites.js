const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        controller.getOthersites()
            .then(val => res.json(val))
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    });

module.exports = router;