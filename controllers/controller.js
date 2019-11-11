const Joke = require('../models/Jokes');

/* Start på OthersiteJokes
exports.getOtherSiteJokes = async function(id) {
    const response = await fetch('https://krdo-joke-registry.herokuapp.com/api/services');
    const sites = await response.json();
    const foundSite = sites.find(site => site._id == id);
    const siteResponse = await fetch(foundSite.address + 'api/jokes');
    const siteJson = await siteResponse.json();
    return siteJson;
}
*/

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



