const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        controller.getOthersites('https://krdo-joke-registry.herokuapp.com/api/services')
            .then(val => res.json(val))
            .catch(err => {
                console.log(err);
                res.status(400).send(err);
            });
    });

module.exports = router;