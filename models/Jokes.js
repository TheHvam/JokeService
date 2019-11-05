const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jokes = new Schema({
    setup: String,
    punchline: String
});

jokes.methods.toString = function () {
    return this.setup + ", " + this.punchline;
};

module.exports = mongoose.model('Jokes', jokes);