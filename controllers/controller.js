const Joke = require('../models/Jokes');

exports.createJoke = function (setup, punchline) {
    const  joke = new Joke({
        setup: setup,
        punchline: punchline
    });
    return joke.save();
};

exports.getJoke = function (jokeId) {
    return Joke.findOne({_id: jokeId}).exec;
};

exports.getJokes = function () {
    return Joke.find().populate().exec();
}
/*
exports.getJokesFromURL = function (url) {
    return Joke
}
 */

