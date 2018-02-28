const login = require('./login');
const score = require('./score');
const top = require('./top');

module.exports = [...login, ...score, ...top];
