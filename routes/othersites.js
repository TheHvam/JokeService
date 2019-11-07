const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();

function getOthersites (url) {
    let arr = [];
    fetch(url)
        .then(response => response.json())
        .then(array => arr = array);
    return arr.exec;
};

router
    .get('/', (req, res) => {
        getOthersites('https://krdo-joke-registry.herokuapp.com/api/services')
            .then(val => res.json(val))
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    });

module.exports = router;