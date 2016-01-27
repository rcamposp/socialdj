
DZ.init({
    appId  : deezer_api_key,
    channelUrl : 'localhost',
    player: {
      container: 'player',
      width : 320,
      height : 62,
      onload : function(){}
    }
  });
  
    DZ.Event.subscribe('track_end', function(track, evt_name){
	 var scope = angular.element($("#session")).scope();        
        scope.$apply(function(){
			scope.session.skipSong();            
        });
});