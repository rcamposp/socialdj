var app = angular.module('socialdjApp',[]);

app.controller('SongCtrl', function(){
	
});

app.controller('SessionCtrl',['$http', function($http){	
	this.songList = {};
	this.searchSongList = Object.create(searchSongListDemo);
	this.currentSong = {
		name	: "Foals Great Hits",
		artist	: "Foals",
		thumb	: "https://i.ytimg.com/vi/uG9JJZM_mVg/default.jpg",
		votes	: 15,
		playerid : "uG9JJZM_mVg",
	};

	this.searchSongs = function(query){		
		//this.searchSongList = Object.create(searchSongListDemo);
		//return this.searchSongList;
		var searchResults = this;
		searchResults.searchSongList = [];
		//Sample API Request
		//https://www.googleapis.com/youtube/v3/search?q=dogs&part=snippet&type=video&maxResults=12&key=AIzaSyDnh9jrfKUgy8g7v6qGXQomwwqkzYh8bok
		$http.jsonp('http://api.deezer.com/search?callback=JSON_CALLBACK&output=jsonp&q='+query).
		  success(function(dataResult, status, headers, config) {
		    data = dataResult.data;
		    var results = [];
		    for(i=0;i<data.length;i++){
		    	searchResults.searchSongList.push({
		    		id 			: 0, 
		    		name		: data[i].title,
		    		artist		: data[i].artist.name,
		    		thumb 		: data[i].album.cover_medium,
		    		votes 		: 1,
		    		playerid	: data[i].id,
		    	});
		    }
		    //searchResults = results;		    
		    return searchResults;
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
		  return searchResults.searchSongList;
	};

	this.addVote = function(song){
		song.votes = song.votes + 1;
		window.app.updateSong(song);
	}

	this.removeVote = function(song){
		if(song.votes > 0){
			song.votes = song.votes - 1;	
			window.app.updateSong(song);
		}
	}

	this.updateSong = function(song){
		window.app.getSong(song);
	}

	this.addSong = function(song){	
		isOnList = this.getIndexOfSong(song);			
		if(!isOnList){
			this.songList.push(song);
			window.app.addSong(song);		
			//Remove song from the search results so you can't add it again.
			var index = this.searchSongList.indexOf(song);
	  		this.searchSongList.splice(index, 1); 
		}else{
			alert("Song is already on list! A vote has been added.");
			this.addVote(song);
		}		
	}

	//Check if song is already on the list and returns the index. If not on list. returns false.
	this.getIndexOfSong = function(song){
		var isOnList = false;
		for(i = 0; i < this.songList.length; i++){
			if(this.songList[i].name === song.name){
				isOnList = i;
			}
		}
		return isOnList;
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
		this.currentSong = songWithMostVotes;
		this.songList.splice(index,1);		
		DZ.player.playTracks([this.currentSong.playerid]);					
	}

}]);

var songs = [	
	{
		name 	: "Foals - Mountain At My Gates",
		artist 	: "Foals",
		thumb 	: "https://i.ytimg.com/vi/-QHZ2YRPFVo/default.jpg",		
		votes 	: 10,
		playerid : "-QHZ2YRPFVo",
	},
	{
		name 	: "Foals - What Went Down [Official Music Video]",
		artist 	: "Foals",
		thumb 	: "https://i.ytimg.com/vi/iuQQIawCqBA/default.jpg",		
		votes 	: 12,
		playerid : "QHZ2YRPFVo",
	},
	{
		name 	: "FOALS - A Knife In The Ocean (Live BBC Radio 1)",
		artist 	: "Foals",
		thumb 	: "https://i.ytimg.com/vi/vxr1jaru6XQ/default.jpg",
		votes 	: 8,
		playerid : "vxr1jaru6XQ",
	},

];



var searchSongListDemo = [
	{
		name	: "Elephant Guns",
		artist	: "Beirut",
		thumb	: "beirtu1.jpg",
		votes	: 0		
	},
	{
		name	: "Sunday Smile",
		artist	: "Beirut",
		thumb	: "beirtu2.jpg",
		votes	: 0		
	},
	{
		name	: "Postcards from Italy",
		artist	: "Beirut",
		thumb	: "beirtu1.jpg",
		votes	: 0		
	},
	{
		name	: "Santa Fe",
		artist	: "Beirut",
		thumb	: "beirtu2.jpg",
		votes	: 0		
	},
	{
		name	: "The Penalty",
		artist	: "Beirut",
		thumb	: "beirtu1.jpg",
		votes	: 0		
	},
	{
		name	: "Vagabond",
		artist	: "Beirut",
		thumb	: "beirtu1.jpg",
		votes	: 0		
	},
	{
		name	: "Nantes",
		artist	: "Beirut",
		thumb	: "beirtu1.jpg",
		votes	: 0		
	},
	{
		name	: "Un Dernier Verre (Pour La Rason)",
		artist	: "Beirut",
		thumb	: "beirtu1.jpg",
		votes	: 0		
	},
	{
		name	: "St. Apollonia",
		artist	: "Beirut",
		thumb	: "beirtu1.jpg",
		votes	: 0		
	},
	{
		name	: "The Flying Club Cup",
		artist	: "Beirut",
		thumb	: "beirtu1.jpg",
		votes	: 0		
	}

];