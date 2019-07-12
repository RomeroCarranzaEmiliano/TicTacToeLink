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

		var c;
		var game;
		//This handle the conn to the client
		//==================================
		var conn = setInterval(function(){
			//get data
			game = global.games[gameID];
			//

			//get player's call
			if (global.games[gameID].players[game.turn].call != -1) {
				c = global.games[gameID].players[game.turn].call;
				global.games[gameID].board[c] = 1+game.turn;
				global.games[gameID].time = 0;
			}
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
			} else if (game.turn == player && game.animate == false) {
				global.games[gameID].players[game.turn].call = -1;
				//time left, run clock
				global.games[gameID].time -= 1;
			}
			//

		}, 1);
		//==================================

	},

	move: async function(req, res) {
		var gameID = req.body.match;
		var move = req.body.move;
		var p = req.body.me;

		var ip = req.ip;
    	var socket = sails.sockets.getId(req);

		//check if the player belongs to the game
		//check if the move is allowed
		
		var allowed = false;
		var game = global.games[gameID];
		if (game.board[move] == 0) {
			allowed = true;
		}
		
		var room = global.rooms[gameID];
		var p1 = room.player1;
		var p2 = room.player2;
		var allowed2 = false;
		if (socket == p1.socket || socket == p2.socket) {
			allowed2 = true;
		}
		if (ip == p1.ip || ip == p2.ip) {
			allowed2 = true;
		}
		

		if (allowed == true && allowed2 == true) {
			global.games[gameID].players[p].call = move;
		} else {
			global.games[gameID].players[p].call = -1;
		}
		
	},

	animateWin: async function(gameID, winner) {

		var channel = 'match-'+gameID; 
		var game = global.games[gameID];
		global.games[gameID].animate = true;
		sails.sockets.broadcast(channel, 'show-parcial-winner', winner);

	},

	animated: async function(req, res) {
		var gameID = req.body.match;


		global.games[gameID].animate = false;

	}

};

