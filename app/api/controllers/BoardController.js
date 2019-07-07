/**
 * BoardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	setup: async function(gameID) {
		var game = {
			id: gameID,
			board: [],
			turn: 0,
			players: [],
			played: false,
			time: 5000
		};

		//			[   A   ][   B   ][   C   ]
		var board = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 1(player 1) and 2(player 2)
		
		var player = {
			chips: 3
		};
		var players = [player, player];

		game.board = board;
		game.players = players;

		return game;

	}
  

};

