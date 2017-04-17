queueKle.factory('Spotify',function ($resource,$cookieStore) {

	//search variables
	this.searchBack = false;
	this.artistSearch = [];
	this.albumSearch = [];
	this.trackSearch = [];
	this.artistAlbums = [];
	this.artistName = [];
	this.searched = null;
	this.back = false;
	this.searchWord = [];

	//global variabels
	this.queue = [];
	this.artistCtrl = false;
	this.albumCtrl = false;

	//sort variables
	this.trackSort = true;
	this.artistSort = true;
	this.albumSort = true;
	this.popSort = true;
	
	_this = this;
	this.getCookieQueue = function() {
		var tempQueue = $cookieStore.get("queue");
		for(song in tempQueue) { 
			_this.getTrackByID.get({id:tempQueue[song]}, function(data) {
				_this.queue.push(data);
			 });
		}
	}


	//calculates totalplaytime in playlist
	this.getPlaylistTime = function(playlist) {
		var runtime = 0;
		for (song in playlist) {
			runtime += playlist[song].duration_ms * 0.001;
		}
		var min = 0;
		var sec = runtime;
		var rest=true;
		while (rest==true) {
			if (sec-60 > 0) {
				sec = sec-60;
				min +=1;
			} 
			else {
				sec = Math.round(sec)
				rest=false;
			}
		}
		if (sec < 10) {
			var results = min +":0"+sec;
		}
		else {
			var results = min +":"+sec;
		} 
		return results;
	}
	//updates the cookies
	this.updateCookieQueue = function() {
		var cookieQueue = [];
		for (song in this.queue) {
			cookieQueue.push(this.queue[song].id);
		}
		$cookieStore.put("queue", cookieQueue);
		var bajs = $cookieStore.get("queue");
	}
	//adds song to queue
	this.addToPlaylist = function(song) {
		this.queue.push(song);
		this.updateCookieQueue();
	}
	//resets the playlist when playlist is saved
	this.resetPlaylist = function() {
		this.queue = [];
		this.updateCookieQueue();
	}
	//Deletes song from queue
	this.removeSong = function(id) {
		for (song in this.queue) {
			if (id == this.queue[song].id) {
				this.queue.splice(song,1);
			}
		}
		this.updateCookieQueue();
	}
	//returns the queue
	this.getQueue = function() {
		return this.queue;
	}

	//Spotify Api-requests
	this.Artist = $resource('https://api.spotify.com/v1/search?q=:name&type=artist&limit=5',{},{
    get: {
		}
	});

	this.AlbumSearchArtistId = $resource('https://api.spotify.com/v1/artists/:id/albums',{},{
    get: {
		}
	});

	this.track = $resource('https://api.spotify.com/v1/search?q=:track&type=track&limit=50',{},{
		get: {}
	});

	this.album = $resource('https://api.spotify.com/v1/search?q=:name&type=album&limit=5',{},{
		get: {}
	});

	this.artistAlbum = $resource('https://api.spotify.com/v1/artists/:id/albums',{},{
    get: {
		}
	});

	this.getArtist = $resource('https://api.spotify.com/v1/artists/:id',{},{
    get: {
		}
	});

	this.getTrack = $resource('https://api.spotify.com/v1/albums/:id/tracks',{},{
    get: {
		}
	});

	this.getTrackByID = $resource('https://api.spotify.com/v1/tracks/:id', {}, {
		get: {}
	});

	this.getAlbum = $resource('https://api.spotify.com/v1/albums/:id',{},{
    get: {
		}
	});
	this.getCookieQueue();
	return this;

	

});