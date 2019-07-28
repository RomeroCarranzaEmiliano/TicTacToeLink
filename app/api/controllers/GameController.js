/**
 * GameController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	init: async function(gameID) {

		//variables for comunication with other controllers
		var boardC = require('./BoardController');
		var playerC = require('./PlayerController');
		var u = require('./UtilitiesController');
		//

		//setup game
		var game = await boardC.setup(gameID);
		global.games[game.id] = game;

		//open conn to clients
		playerC.playerInit(gameID, 0);
		playerC.playerInit(gameID, 1);
		//

		var channel = 'match-'+gameID; 

		var board1 = [];
		var board2 = [];
		var sum1 = [];
		var sum2 = [];
		var winner = -1;

		sails.sockets.broadcast(channel, 'game-start', '');

		//mainloop
		var mainloop = setInterval(function(){
			//get gamedata and broadcast board to clients
			global.games[gameID].played = false;
			game = global.games[gameID];
			playerC.upload(game);
			
			if (game.animate == false) {

				//broadcast information
				channel = 'match-'+gameID; 
	    		sails.sockets.broadcast(channel, 'update-board', game.board);
	    		sails.sockets.broadcast(channel, 'update-turn', game.turn);
	    		sails.sockets.broadcast(channel, 'update-time', game.time);
	    		sails.sockets.broadcast(channel, 'update-score', game.score);
				//
				//if a player's score reach 5, finish game
				if (global.games[gameID].score.includes(5)) {
					clearInterval(mainloop);
				}


			
				//turn handle
				if (game.time <= 0) {
					global.games[gameID].players[0].call = -1;
					global.games[gameID].players[1].call = -1;
					global.games[gameID].turn += 1;
					if (global.games[gameID].turn == 2) {
						global.games[gameID].turn = 0;
					}
					global.games[gameID].time = 5000;
				}

				winner = u.getWinner(gameID);

				if (winner != -1) { //someone won
					//
					playerC.animateWin(gameID, winner);//execute animations
					global.games[gameID].score[winner] += 1;
					global.games[gameID].time = 5000;
					global.games[gameID].board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
					global.games[gameID].players[0].chips = 3;
					global.games[gameID].players[1].chips = 3;
					winner = -1;
				}
				if (game.players[0].chips == 0 && game.players[1].chips == 0) { //all chips used
					global.games[gameID].time = 5000;
					global.games[gameID].board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
					global.games[gameID].players[0].chips = 3;
					global.games[gameID].players[1].chips = 3;
					winner = -1;
				}

			}


		}, 1);

		if (global.games[gameID].score.includes(5)) {
			setInterval(function() {
				//delete global.rooms[gameID];
				//delete global.games[gameID];
			});
		}


	}  

};


