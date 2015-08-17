
DZ.init({
    appId  : 'e578f30dfee96be239aa95680c2f1b08',
    channelUrl : 'localhost',
    player: {
      container: 'player',
      width : "100%",
      height : 70,
      onload : function(){}
    }
  });
  
    DZ.Event.subscribe('track_end', function(track, evt_name){
	 var scope = angular.element($("#session")).scope();        
        scope.$apply(function(){
			scope.session.skipSong();            
        });
});