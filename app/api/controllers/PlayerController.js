/**
 * PlayerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
	upload: async function(gameData) {
		var game = gameData;

		//BROADCASTING OF BOARD DATA
		//==========================
		//console.log('board: '+game.board);
		//console.log('player1 chips: '+game.players[0].chips);
		//console.log('player2 chips: '+game.players[1].chips);
		//console.log('=======================================');
		//console.log('turn: '+game.turn);
		//console.log('time: '+game.time);
		//==========================


	},

	playerInit: async function(gameID, player) {
		var p = player; //to identify the player

		var game;
		//This handle the conn to the client
		//==================================
		var conn = setInterval(function(){
			//get data
			game = global.games[gameID];
			//

			//
			if (global.games[gameID].time == 1) {
				//1ms left, do random move
				var r = Math.floor((Math.random() * 10));
				while (game.board[r] != 0) {
					r = Math.floor((Math.random() * 10));
				}
				global.games[gameID].board[r] = 1+game.turn;
				global.games[gameID].time = 0;
				global.games[gameID].players[p].chips -= 1;
				//
			} else if (game.turn == player) {
				//time left, run clock
				global.games[gameID].time -= 1;
			}
			//

		}, 1);
		//==================================

	}

};

