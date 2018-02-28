const userRoutes = require('./users');
const questionRoutes = require('./questions');

module.exports = [...userRoutes, ...questionRoutes];
