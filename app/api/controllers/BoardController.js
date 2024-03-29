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
			time: 5000,
			animate: false,
			score: [0, 0]
		};

		//			[   A   ][   B   ][   C   ]
		var board = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 1(player 1) and 2(player 2)
		
		var player1 = {
			chips: 3,
			call: -1
		};
		var player2 = {
			chips: 3,
			call: -1
		};
		var players = [player1, player2];

		game.board = board;
		game.players = players;

		return game;

	}
  

};

