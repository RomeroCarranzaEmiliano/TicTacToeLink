/**
 * ServerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  create: async function(req, res) {

  	var gameController = require('./GameController');

    function makeid(length) {
      var result           = '';
      var characters       = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }


  	var game_id = makeid(10); // !!! unique ID must be created instead

    console.log(game_id);

  	var userIP = req.ip;
    var socketID = sails.sockets.getId(req);

  	global.rooms[game_id] = {
  		player1: {socket: socketID, ip: userIP, state: 'CON'},
  		player2: {socket: '', ip: '', state: 'DIS'},
  		status: 'waiting'
  	}

    /*
  	//Conn to game socket channel
    var channel = 'match-'+game_id; 
    sails.sockets.join(req, channel); //conn player to the channel
  */ // <--- borrar?

    return res.send(game_id);

  },

  conn: async function(req, res) {
    var userIP = req.ip;
    var socketID = sails.sockets.getId(req);

    var game_id = req.body.match;
    var gameID = game_id;

    var fullroom = false;
    //check free seats and conn client to match
    if (global.rooms[gameID].player1.state != 'CON') {
      global.rooms[gameID].player1.socket = socketID;
      global.rooms[gameID].player1.ip = userIP;
      global.rooms[gameID].player1.state = 'CON';
    } else {
      global.rooms[gameID].player2.socket = socketID;
      global.rooms[gameID].player2.ip = userIP;
      global.rooms[gameID].player2.state = 'CON';
      //the room is full, so start game
      fullroom = true;
    }
    //

    //Conn to game's socket channel
    var channel = 'match-'+game_id; 
    sails.sockets.join(req, channel); //conn player to the channel

    if (fullroom == true) {
      var gameController = require('./GameController');
      gameController.init(game_id);
    }

  },

  onPutLink: function(req, res) {
    var game_id = req.param('match');
    return res.view('pages/play', { layout: 'layouts/play_l', match: game_id});
  }

};

