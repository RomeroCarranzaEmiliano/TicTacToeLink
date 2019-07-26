#Structure
##Main structure


###ServerController
This controller manage everything that exceeds the gameplay
*Creates a new game
*Connects clients to the game
*Retrieves the game's url to the client who created it

###GameController
This controller allocates the game's mainloop an nothing else

###PlayerController
This controller allocates the client's loops and perform the players ingame actions
*Initialize the client's loop
*Verify and perform player's actions
*Trigger client-side animations

###BoardController
This controller perform a setup of the game's object with the structure for the gameplay data

###Utilities
For other functions and utilities, for example:
- Function for generating ID
- Function for generating random numbers
- Functions for detecting a winner
- etc

###Datastore
All data is stored in memory, a redis database could be implemented

###Client-Server
Client connects to server via websockets, when the game is created, a cannel with te game's ID is created for players to be connected

##Main loop structure
...

##Players' loop structure
...

#Bugs & Issues
This bugs have been encountered while testing in a remote server with to clients connected from different internet providers and locations.
##List of bugs
*After some time, the winner isn't detected and the game breaks
*Too lagy when performing moves (might be due to internet low connections)

#For further development
...

