window.app = {};

//Cuando el API esté lista, cargo la lista inicial de canciones
document.addEventListener("apiReady", function(){
	window.app.getSongs();
});

//Insert a record
window.app.addSong = function (item,callback) {    
    window.df.apis.socialdj.createRecords({"table_name":"playlist", "body":item}, function(response) {        
        var scope = angular.element($("#session")).scope();        
        scope.$apply(function(){
            item.id = response.id;                      
            socketioclient.notifySongChange(item,"add");
        });
    }, function(response) {
        console.log(window.app.getErrorString(response));
    });
};

//get records from a table?  easy.  Just pass the path variable table_name
//A path variable simply gets tacked on to the endpoint, not as a query param.
window.app.getSongs = function () {	
    window.df.apis.socialdj.getRecords({table_name: "playlist"}, function (response) {
        //Do something with the data;
        var scope = angular.element($("#session")).scope();        
	    scope.$apply(function(){
	        scope.session.songList = response.record;
            for(i=0;i<scope.session.songList.length;i++){
                if(scope.session.songList[i].playing == 1){
                    scope.session.currentSong = scope.session.songList[i];
                    DZ.player.playTracks([scope.session.currentSong.playerid], false);                  
                    console(scope.session.currentSong);
                }    
            } 
	    });       
    }, function(response) { //Error
        console.log(window.app.getErrorString(response));
    });
};

//get records from a table?  easy.  Just pass the path variable table_name
//A path variable simply gets tacked on to the endpoint, not as a query param.
window.app.getSong = function (songId) { 
    window.df.apis.socialdj.getRecord({table_name: "playlist", "id" : id}, function (response) {
        //Do something with the data;
        var scope = angular.element($("#session")).scope();        
        scope.$apply(function(){
            for(i=0;i<scope.session.songList.length;i++){
                if(scope.session.songList[i].id == songId){
                    scope.session.songList[i] = response.record;
                }    
            }            
        });       
    }, function(response) { //Error
        console.log(window.app.getErrorString(response));
    });
};

//Update a record
window.app.updateSong = function (item) {    
    var item = {"record":[item]};
    df.apis.socialdj.updateRecords({"table_name":"playlist", "body":item}, function(response) {
        var scope = angular.element($("#session")).scope();        
        scope.$apply(function(){
            songId = response.record[0].id;            
            for(i=0;i<scope.session.songList.length;i++){
                if(scope.session.songList[i].id == songId){                    
                    socketioclient.notifySongChange(scope.session.songList[i],"update");
                }    
            } 
        });                            
    }, function(response) {
        console.log(window.app.getErrorString(response));
    });
};

//Delete a record
window.app.deleteSong = function (song) {        
    df.apis.socialdj.deleteRecord({"table_name":"playlist", "id":song.id}, function(response) {
        var scope = angular.element($("#session")).scope();        
        scope.$apply(function(){
            socketioclient.notifySongChange(song,"delete");
        });                            
    }, function(response) {
        console.log(window.app.getErrorString(response));
    });
};