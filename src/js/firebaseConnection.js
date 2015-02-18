var Firebase = require('firebase');

var baseUrl = 'https://incandescent-fire-2676.firebaseio.com';

var firebaseConnection = new Firebase(baseUrl);

module.exports = firebaseConnection;