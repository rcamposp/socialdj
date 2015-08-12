var socket = io.connect('http://localhost:4000');

function updateSong (song) {
    //Ajax call to update the song    
    var scope = angular.element($("#session")).scope();  
    if(scope != undefined){
        scope.$apply(function(){
            var found = false;
            for(i=0;i<scope.session.songList.length;i++){
                if(scope.session.songList[i].id == song.song.id){                    
                    scope.session.songList[i] = song.song;
                    found = true;
                }    
            }             
            if(!found){
                scope.session.songList.push(song.song);
            }
        }); 
    }  
};

// This will be fired 
socket.on('messages-available', function (data) {    
    for (var i = 0; i < data.length; i++) {
        updateSong(data[i]);
    }
});

// This listens for any individual messages coming back from the server
socket.on('message-added', updateSong);

// When the user gets the confirmation of it's action (addSong, addVote, removeVote we'll emit the data to the server
var socketioclient = {};

socketioclient.notifySongChange = function(songData){            
    // Send the "add-message" message to the server with our values
    socket.emit('add-message', {
        song : songData
    });

}