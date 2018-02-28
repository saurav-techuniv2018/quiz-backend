const userRoutes = require('./users');
const questionRoutes = require('./questions');
const answerRoutes = require('./answers');

module.exports = [...userRoutes, ...questionRoutes, ...answerRoutes];
