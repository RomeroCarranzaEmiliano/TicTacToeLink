/**
 * UtilitiesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

  	getWinner: function(gameID) {
  		var game = global.games[gameID];
  		var board1 = [];
		var board2 = [];
		var sum1 = [];
		var sum2 = [];
		var winner = -1;

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

		return winner;

  	}

};

