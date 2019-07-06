/**
 * ServerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  create: async function(req, res) {

  	var gameController = require('./GameController');

  	var game_id = 'AAA000'; // !!! debe crearse un id unico

  	gameController.init(game_id);

  }

};

