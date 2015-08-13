var app = angular.module('socialdjApp',[]);

app.controller('SongCtrl', function(){
	
});

app.controller('SessionCtrl',['$http', function($http){	
	this.songList = {};
	//this.songList = demo_data.songList;
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
		    console.log(JSON.stringify(searchResults));
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
			callback = function(){

			}
			window.app.addSong(song,callback);
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


demo_data = {"songList":[{"id":1,"name":"Lean On (feat. MØ & DJ Snake)","artist":"Major Lazer","votes":1,"playerid":"95938472","thumb":"http://cdn-images.deezer.com/images/cover/4ab89ee1e4c9f85cb17b12acefd2e8af/250x250-000000-80-0-0.jpg","$$hashKey":"object:8"},{"id":2,"name":"Nota de Amor","artist":"Carlos Vives","votes":1,"playerid":"94609844","thumb":"http://cdn-images.deezer.com/images/cover/b225f95c784421cf6ec8b4a6c4f53eca/250x250-000000-80-0-0.jpg","$$hashKey":"object:9"},{"id":3,"name":"Sígueme Y Te Sigo","artist":"Daddy Yankee","votes":8,"playerid":"96507494","thumb":"http://cdn-images.deezer.com/images/cover/5cc9de5d7c118050aeecd621459d7442/250x250-000000-80-0-0.jpg","$$hashKey":"object:5"},{"id":4,"name":"Prometo Olvidarte","artist":"Tony Dize","votes":3,"playerid":"98135528","thumb":"http://cdn-images.deezer.com/images/cover/3a283900127bdd5652048739ac8d2939/250x250-000000-80-0-0.jpg","$$hashKey":"object:6"},{"id":5,"name":"Te Para 3 (MTV Unplugged)","artist":"Soda Stereo","votes":2,"playerid":"4095512","thumb":"http://cdn-images.deezer.com/images/cover/eb34ab659cf334dc57d61c4406358f30/250x250-000000-80-0-0.jpg","$$hashKey":"object:7"},{"id":6,"name":"El Doctorado","artist":"Tony Dize","votes":9,"playerid":"15671480","thumb":"http://cdn-images.deezer.com/images/cover/6a2a1b1a61b7e13d0d13bead575c7df9/250x250-000000-80-0-0.jpg","$$hashKey":"object:4"}],"searchSongList":[{"id":0,"name":"A Knife In The Ocean","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/d7024bf644f59bffc6a1706190fbb763/250x250-000000-80-0-0.jpg","votes":1,"playerid":105211626},{"id":0,"name":"Mountain At My Gates","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/d7024bf644f59bffc6a1706190fbb763/250x250-000000-80-0-0.jpg","votes":1,"playerid":104094630},{"id":0,"name":"My Number","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/a1cfc951df3e31da08c955b99280e515/250x250-000000-80-0-0.jpg","votes":1,"playerid":64472943},{"id":0,"name":"Late Night","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/a1cfc951df3e31da08c955b99280e515/250x250-000000-80-0-0.jpg","votes":1,"playerid":64472946},{"id":0,"name":"What Went Down","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/d7024bf644f59bffc6a1706190fbb763/250x250-000000-80-0-0.jpg","votes":1,"playerid":102350520},{"id":0,"name":"Inhaler","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/a1cfc951df3e31da08c955b99280e515/250x250-000000-80-0-0.jpg","votes":1,"playerid":64472942},{"id":0,"name":"Olympic Airways","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/db98d30eeae8ada5c4493a072f099c05/250x250-000000-80-0-0.jpg","votes":1,"playerid":797959},{"id":0,"name":"Spanish Sahara","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979390},{"id":0,"name":"The French Open","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/db98d30eeae8ada5c4493a072f099c05/250x250-000000-80-0-0.jpg","votes":1,"playerid":797945},{"id":0,"name":"Miami","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979386},{"id":0,"name":"This Orient","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979392},{"id":0,"name":"Fugue","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979393},{"id":0,"name":"After Glow","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979394},{"id":0,"name":"2 Trees","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979397},{"id":0,"name":"Black Gold","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979389},{"id":0,"name":"Total Life Forever","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979387},{"id":0,"name":"Blue Blood","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979385},{"id":0,"name":"Electric Bloom","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/db98d30eeae8ada5c4493a072f099c05/250x250-000000-80-0-0.jpg","votes":1,"playerid":797964},{"id":0,"name":"Hummer","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/11420476e412a65573c4361004075678/250x250-000000-80-0-0.jpg","votes":1,"playerid":796654},{"id":0,"name":"Moon","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/a1cfc951df3e31da08c955b99280e515/250x250-000000-80-0-0.jpg","votes":1,"playerid":64472951},{"id":0,"name":"Bad Habit","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/a1cfc951df3e31da08c955b99280e515/250x250-000000-80-0-0.jpg","votes":1,"playerid":64472944},{"id":0,"name":"Alabaster","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979396},{"id":0,"name":"What Remains","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979398},{"id":0,"name":"Red Socks Pugie","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/db98d30eeae8ada5c4493a072f099c05/250x250-000000-80-0-0.jpg","votes":1,"playerid":797954},{"id":0,"name":"Out Of The Woods","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/a1cfc951df3e31da08c955b99280e515/250x250-000000-80-0-0.jpg","votes":1,"playerid":64472947}],"currentSong":{"name":"Foals Great Hits","artist":"Foals","thumb":"https://i.ytimg.com/vi/uG9JJZM_mVg/default.jpg","votes":15,"playerid":"uG9JJZM_mVg"}};
