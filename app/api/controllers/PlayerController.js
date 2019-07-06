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

		//==========================


	}

};

