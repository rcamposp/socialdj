var app = angular.module('socialdjApp',["firebase"]);

app.controller('SessionCtrl',['$scope', '$http', '$firebaseArray', '$firebaseObject' , function($scope, $http, $firebaseArray, $firebaseObject){	
	var ref = new Firebase("https://socialdj.firebaseio.com/songList");
	var currentSongRef = new Firebase("https://socialdj.firebaseio.com/currentSong");
	var obj = $firebaseObject(ref);			

	this.firebaseObject = obj; //When this is loaded, the loading animation disappears
	this.songList = $firebaseArray(ref);
	this.showLoader = true;
	var obj = $firebaseObject(ref);
	obj.$loaded(
	  function(data) {	    	  	
	    $scope.session.showLoader = false;	    
	  },
	  function(error) {
	    console.error("Error:", error);
	  }
	);
	//this.songList = demo_data;	
	this.searchSongList = {};
	this.searchResults = {};
	this.currentSong = $firebaseObject(currentSongRef);	

	this.searchSongs = function(query){				
		var results = this;
		results.searchSongList = [];				
		$http.jsonp('http://api.deezer.com/search?callback=JSON_CALLBACK&output=jsonp&q='+query).
		  success(function(dataResult, status, headers, config) {
		    data = dataResult.data;
		    
		    for(i=0;i<data.length;i++){
		    	results.searchSongList.push({		    		
		    		name		: data[i].title,
		    		artist		: data[i].artist.name,
		    		thumb 		: data[i].album.cover_medium,
		    		votes 		: 1,
		    		playerid	: data[i].id,		    		
		    	});
		    }		    
		    results.searchResults = results.searchSongList;
		    return results;
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
		  return results.searchSongList;
	};

	this.addVote = function(song){		
		index = this.songList.$indexFor(song.$id);
		if(index != -1){
			song.votes = song.votes + 1;
			this.songList.$save(index).then(function(ref){
				console.log("vote added");
			});
		}
	}

	this.removeVote = function(song){
		index = this.songList.$indexFor(song.$id);
		if(index != -1){
			song.votes = song.votes - 1;
			this.songList.$save(index).then(function(ref){
				console.log("vote removed");
			});
		}
	}

	this.updateSong = function(song){
		window.app.getSong(song);
	}

	this.addSong = function(song){
		song = angular.copy(song);		
		controllerInstance = this;		
		this.songList.$ref().orderByChild("playerid").equalTo(song.playerid).once("value", function(dataSnapshot){
	        var playerid = dataSnapshot.val();	        
	        if(dataSnapshot.exists()){
	          	alert("Song is already on list! A vote has been added.");
				controllerInstance.addVote(song);
	        } else {	        	
	        	controllerInstance.songList.$add(song);
				//Remove song from the search results so you can't add it again.
				var index = controllerInstance.searchSongList.indexOf(song);
	  			controllerInstance.searchSongList.splice(index, 1); 
	        }
	    })		
	}

	this.deleteSong = function(song){		
		index = this.songList.$indexFor(song.$id);
		var item = this.songList[index];
		this.songList.$remove(item).then(function(ref) {
		  //console.log(ref.key() === item.$id); // true
		});
	}

	//Check if song is already on the list and returns the index. If not on list. returns false.
	this.isOnList = function(song){
		var onlist = false;
		for(i = 0; i < this.songList.length; i++){
			if(this.songList[i].name === song.name){
				onlist = i;
			}
		}
		return onlist;
	};

	this.skipSong = function(){
		var songWithMostVotes = {votes:-1};
		var index = 0;
		for (i = 0; i < this.songList.length; i++){
			if(this.songList[i].votes > songWithMostVotes.votes){
				songWithMostVotes = this.songList[i];
				index = i;
			}
		}				
		
		this.currentSong.name = songWithMostVotes.name;
		this.currentSong.artist = songWithMostVotes.artist;
		this.currentSong.thumb = songWithMostVotes.thumb;
		this.currentSong.votes = songWithMostVotes.votes;
		this.currentSong.playerid = songWithMostVotes.playerid;
		
		playlistObject = this;
		this.currentSong.$save().then(function(ref){			
			DZ.player.playTracks([playlistObject.currentSong.playerid]);		

			console.log("Now playing: "+playlistObject.currentSong.name+" - "+playlistObject.currentSong.artist);

			if(Object.keys(playlistObject.currentSong).length !== 0){			
				playlistObject.deleteSong(playlistObject.currentSong);
			}else{
				playlistObject.songList.splice(index,1);
			}
		});				

		
			
		
		//borrada = this.songList.splice(index,1);			
		//console.log(borrada);
		

		
		
	};

	this.hideElement = function(element){
		$(element).addClass("hide");		
	};

}]);

