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
		global.games[game.id] = game;

		//open conn to clients
		playerC.playerInit(gameID, 0);
		playerC.playerInit(gameID, 1);
		//

		var channel = 'match-'+gameID; 

		//mainloop
		var mainloop = setInterval(function(){
			//get gamedata and broadcast board to clients
			global.games[gameID].played = false;
			game = global.games[gameID];
			playerC.upload(game);
			//broadcast information
			channel = 'match-'+gameID; 
    		sails.sockets.broadcast(channel, 'update-board', game.board);
			//

			//turn handle
			if (game.time <= 0) {
				global.games[gameID].turn += 1;
				if (global.games[gameID].turn == 2) {
					global.games[gameID].turn = 0;
				}
				global.games[gameID].time = 5000;
			}
			//

			if (game.players[0].chips == 0) { //all chips used
				clearInterval(mainloop);
			} 
		}, 1);
		//

		//Get winner and broadcast


		//


	}  

};

