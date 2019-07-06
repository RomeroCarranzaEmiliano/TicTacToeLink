/**
 * GameController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	init: async function(gameID) {

		//var for comunication with controllers
		var boardC = require('./BoardController');
		var playerC = require('./PlayerController');
		//

		//setup game
		var game = await boardC.setup(gameID);

		//mainloop
		var mainloop = setInterval(function(){
			//send board data to clients
			playerC.upload(game);

			if (game.players[1].chips == 0) { //all chips used
				clearInterval(mainloop);
			}
		}, 1);
		//


	}  

};

