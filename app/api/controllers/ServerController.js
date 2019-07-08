/**
 * ServerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  create: async function(req, res) {

  	var gameController = require('./GameController');

  	var game_id = 'AAA000'; // !!! unique ID must be created instead


  	var userIP = req.ip;
	var socketID = sails.sockets.getId(req);

  	global.rooms[game_id] = {
  		player1: {socket: socketID, ip: userIP, state: 'CON'},
  		player2: {socket: '', ip: '', state: 'DIS'},
  		status: 'waiting'
  	}

  	//Conn to game socket channel
    var channel = 'match-'+game_id; 
    sails.sockets.join(req, channel); //conn player to the channel

    console.log('match created');//borrar

    res.ok();

  },

  conn: async function(req, res) {
  	var userIP = req.ip;
	var socketID = sails.sockets.getId(req);

	var game_id = req.body.match;
	var gameID = game_id;

	console.log(game_id);//borrar

	global.rooms[gameID].player2.socket = socketID;
	global.rooms[gameID].player2.ip = userIP;
	global.rooms[gameID].player2.state = 'CON';

	//Conn to game socket channel
    var channel = 'match-'+game_id; 
    sails.sockets.join(req, channel); //conn player to the channel

    var gameController = require('./GameController');
	gameController.init(game_id);

  }

};

