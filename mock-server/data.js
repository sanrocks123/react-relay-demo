
const casual = require('casual');

const company = {
    name: "Sanjeev Saxena",
    emailAddress: "sanrocks123@mail.com",
    tweet: {
        text: casual.words(3)
    }
}

module.exports = Object.freeze({
    Company: company
})