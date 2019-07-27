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

					//DETECT WINNER
				//===================================
				var i;
				for (i=0; i<game.board.length; i++) {
					if (game.board[i] == 1) {
						board1[i] = 1;
						board2[i] = 0;
					} else if (game.board[i] == 2) {
						board2[i] = 1;
						board1[i] = 0;
					} else {
						board1[i] = 0;
						board2[i] = 0;
					}
				}

				sum1[0] = board1[0] + board1[3] + board1[6];
				sum1[1] = board1[1] + board1[4] + board1[7];
				sum1[2] = board1[2] + board1[5] + board1[8];

				sum2[0] = board2[0] + board2[3] + board2[6];
				sum2[1] = board2[1] + board2[4] + board2[7];
				sum2[2] = board2[2] + board2[5] + board2[8];


				if (sum1.includes(3) == true) {
					winner = 0;
				}
				if (sum2.includes(3) == true) {
					winner = 1;
				}

					if (winner == -1) {
					sum1[0] = board1[0] + board1[1] + board1[2];
					sum1[1] = board1[3] + board1[4] + board1[5];
					sum1[2] = board1[6] + board1[7] + board1[8];

						sum2[0] = board2[0] + board2[1] + board2[2];
					sum2[1] = board2[3] + board2[4] + board2[5];
					sum2[2] = board2[6] + board2[7] + board2[8];

						if (sum1.includes(3) == true) {
						winner = 0;
					}
					if (sum2.includes(3) == true) {
						winner = 1;
					}
				}

					if (winner == -1) {
					sum1[0] = board1[0] + board1[4] + board1[8];
					sum1[1] = board1[2] + board1[4] + board1[6];

						sum2[0] = board2[0] + board2[4] + board2[8];
					sum2[1] = board2[2] + board2[4] + board2[6];

						if (sum1[0] == 3 || sum1[1] == 3) {
						winner = 0;
					}
					if (sum2[0] == 3 || sum2[1] == 3) {
						winner = 1;
					}
				}

					//===================================

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


