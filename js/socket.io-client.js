var socket = io.connect(url_socket_io);

//**********Incomming Messages*************//

//1. This listens for any individual messages coming back from the server
socket.on('songAdded', addSong);
socket.on('songUpdated', updateSong);
socket.on('songDeleted', deleteSong);


function addSong (song) {       
    var scope = angular.element($("#session")).scope();  
    if(scope != undefined){
        scope.$apply(function(){
            var found = false;
            for(i=0;i<scope.session.songList.length;i++){
                if(scope.session.songList[i].id == song.id){                                        
                    found = true;                
                }
            }             
            if(!found){
                scope.session.songList.push(song);
            }
        }); 
    }  
};

//2. Ajax call to update the song    
function updateSong (song) {        
    var scope = angular.element($("#session")).scope();  
    if(scope != undefined){
        scope.$apply(function(){            
            for(i=0;i<scope.session.songList.length;i++){
                if(scope.session.songList[i].id == song.id){                    
                    scope.session.songList[i] = song;                    
                }    
            }                       
        }); 
    }  
};

function deleteSong (song) {    
    var scope = angular.element($("#session")).scope();  
    if(scope != undefined){
        scope.$apply(function(){
            for(i=0;i<scope.session.songList.length;i++){
                if(scope.session.songList[i].id == song.id){                    
                    scope.session.songList[i] = song;
                    scope.session.songList.splice(i,1);
                }    
            } 
        }); 
    }  
};

//**********Outgoing Messages*************//

// When the user gets the confirmation of it's action (addSong, addVote, removeVote we'll emit the data to the server
var socketioclient = {};

socketioclient.notifySongChange = function(song, action){            
    // Send the "add-message" message to the server with our values
    socket.emit('songChange', {
        song    : song,
        action  : action,
    });
}
