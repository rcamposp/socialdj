var app = angular.module('socialdjApp',[]);

app.controller('SongCtrl', function(){
	
});

app.controller('SessionCtrl',function(){
	this.songList = songs;
	this.searchSongList = Object.create(searchSongListDemo);
	this.currentSong = {
		name	: "Milk and Black Spiders",
		artist	: "Foals",
		thumb	: "foals.jpg",
		votes	: 15,
	};

	this.searchSongs = function(){		
		this.searchSongList = Object.create(searchSongListDemo);
		return this.searchSongList;
	};

	this.addVote = function(song){
		song.votes = song.votes + 1;
	}

	this.removeVote = function(song){
		if(song.votes > 0){
			song.votes = song.votes - 1;		
		}
	}

	this.addSong = function(song){	
		isOnList = this.getIndexOfSong(song);			
		if(!isOnList){
			this.songList.push(song);		
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
		
	}

});

var songs = [	
	{
		name 	: "La Noche Vibra",
		artist 	: "Cultura Profetica",
		thumb 	: "cultura.jpg",
		votes 	: 10,
	},
	{
		name 	: "Soda Estereo",
		artist 	: "Te para tres",
		thumb 	: "soda.jpg",
		votes 	: 12,
	},
	{
		name 	: "Circo Beat",
		artist 	: "Fito Paez",
		thumb 	: "fito.jpg",
		votes 	: 8,
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