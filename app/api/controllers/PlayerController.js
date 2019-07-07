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
		console.log('board: '+game.board);
		console.log('player1 chips: '+game.players[0].chips);
		console.log('player1 chips: '+game.players[0].chips);
		console.log('=======================================');
		console.log('time: '+game.turn);
		console.log('time: '+game.time);
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

			//when it is this player's turn
			if (game.turn == player) {
				global.games[gameID].time -= 1;
			}
			//

		}, 1);
		//==================================

	}

};

