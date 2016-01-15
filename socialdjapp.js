var app = angular.module('socialdjApp',["firebase"]);

app.controller('SessionCtrl',['$http', '$firebaseArray', '$firebaseObject' , function($http, $firebaseArray, $firebaseObject){	
	var ref = new Firebase("https://socialdj.firebaseio.com/songList");
	var obj = $firebaseObject(ref);			

	this.firebaseObject = obj; //When this is loaded, the loading animation disappears
	this.songList = $firebaseArray(ref);
	//this.songList = demo_data;	
	this.searchSongList = {};
	this.searchResults = {};
	this.currentSong = {};	

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
		
		this.currentSong = songWithMostVotes;
		
		if(Object.keys(this.currentSong).length !== 0){			
			this.deleteSong(this.currentSong);
		}else{
			this.songList.splice(index,1);
		}
			
		
		//borrada = this.songList.splice(index,1);			
		//console.log(borrada);
		DZ.player.playTracks([this.currentSong.playerid]);					
	};

	this.hideElement = function(element){
		$(element).addClass("hide");		
	};

}]);


demo_data = {"songList":[{"id":1,"name":"Lean On (feat. MØ & DJ Snake)","artist":"Major Lazer","votes":1,"playerid":"95938472","thumb":"http://cdn-images.deezer.com/images/cover/4ab89ee1e4c9f85cb17b12acefd2e8af/250x250-000000-80-0-0.jpg","$$hashKey":"object:8"},{"id":2,"name":"Nota de Amor","artist":"Carlos Vives","votes":1,"playerid":"94609844","thumb":"http://cdn-images.deezer.com/images/cover/b225f95c784421cf6ec8b4a6c4f53eca/250x250-000000-80-0-0.jpg","$$hashKey":"object:9"},{"id":3,"name":"Sígueme Y Te Sigo","artist":"Daddy Yankee","votes":8,"playerid":"96507494","thumb":"http://cdn-images.deezer.com/images/cover/5cc9de5d7c118050aeecd621459d7442/250x250-000000-80-0-0.jpg","$$hashKey":"object:5"},{"id":4,"name":"Prometo Olvidarte","artist":"Tony Dize","votes":3,"playerid":"98135528","thumb":"http://cdn-images.deezer.com/images/cover/3a283900127bdd5652048739ac8d2939/250x250-000000-80-0-0.jpg","$$hashKey":"object:6"},{"id":5,"name":"Te Para 3 (MTV Unplugged)","artist":"Soda Stereo","votes":2,"playerid":"4095512","thumb":"http://cdn-images.deezer.com/images/cover/eb34ab659cf334dc57d61c4406358f30/250x250-000000-80-0-0.jpg","$$hashKey":"object:7"},{"id":6,"name":"El Doctorado","artist":"Tony Dize","votes":9,"playerid":"15671480","thumb":"http://cdn-images.deezer.com/images/cover/6a2a1b1a61b7e13d0d13bead575c7df9/250x250-000000-80-0-0.jpg","$$hashKey":"object:4"}],"searchSongList":[{"id":0,"name":"A Knife In The Ocean","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/d7024bf644f59bffc6a1706190fbb763/250x250-000000-80-0-0.jpg","votes":1,"playerid":105211626},{"id":0,"name":"Mountain At My Gates","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/d7024bf644f59bffc6a1706190fbb763/250x250-000000-80-0-0.jpg","votes":1,"playerid":104094630},{"id":0,"name":"My Number","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/a1cfc951df3e31da08c955b99280e515/250x250-000000-80-0-0.jpg","votes":1,"playerid":64472943},{"id":0,"name":"Late Night","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/a1cfc951df3e31da08c955b99280e515/250x250-000000-80-0-0.jpg","votes":1,"playerid":64472946},{"id":0,"name":"What Went Down","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/d7024bf644f59bffc6a1706190fbb763/250x250-000000-80-0-0.jpg","votes":1,"playerid":102350520},{"id":0,"name":"Inhaler","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/a1cfc951df3e31da08c955b99280e515/250x250-000000-80-0-0.jpg","votes":1,"playerid":64472942},{"id":0,"name":"Olympic Airways","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/db98d30eeae8ada5c4493a072f099c05/250x250-000000-80-0-0.jpg","votes":1,"playerid":797959},{"id":0,"name":"Spanish Sahara","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979390},{"id":0,"name":"The French Open","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/db98d30eeae8ada5c4493a072f099c05/250x250-000000-80-0-0.jpg","votes":1,"playerid":797945},{"id":0,"name":"Miami","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979386},{"id":0,"name":"This Orient","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979392},{"id":0,"name":"Fugue","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979393},{"id":0,"name":"After Glow","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979394},{"id":0,"name":"2 Trees","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979397},{"id":0,"name":"Black Gold","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979389},{"id":0,"name":"Total Life Forever","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979387},{"id":0,"name":"Blue Blood","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979385},{"id":0,"name":"Electric Bloom","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/db98d30eeae8ada5c4493a072f099c05/250x250-000000-80-0-0.jpg","votes":1,"playerid":797964},{"id":0,"name":"Hummer","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/11420476e412a65573c4361004075678/250x250-000000-80-0-0.jpg","votes":1,"playerid":796654},{"id":0,"name":"Moon","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/a1cfc951df3e31da08c955b99280e515/250x250-000000-80-0-0.jpg","votes":1,"playerid":64472951},{"id":0,"name":"Bad Habit","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/a1cfc951df3e31da08c955b99280e515/250x250-000000-80-0-0.jpg","votes":1,"playerid":64472944},{"id":0,"name":"Alabaster","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979396},{"id":0,"name":"What Remains","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/477d55dd956805dd31851f5309f7a323/250x250-000000-80-0-0.jpg","votes":1,"playerid":5979398},{"id":0,"name":"Red Socks Pugie","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/db98d30eeae8ada5c4493a072f099c05/250x250-000000-80-0-0.jpg","votes":1,"playerid":797954},{"id":0,"name":"Out Of The Woods","artist":"Foals","thumb":"http://cdn-images.deezer.com/images/cover/a1cfc951df3e31da08c955b99280e515/250x250-000000-80-0-0.jpg","votes":1,"playerid":64472947}],"currentSong":{"name":"Foals Great Hits","artist":"Foals","thumb":"https://i.ytimg.com/vi/uG9JJZM_mVg/default.jpg","votes":15,"playerid":"uG9JJZM_mVg"}};
