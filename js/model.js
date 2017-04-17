queueKle.factory('Spotify',function ($resource) {

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
	this.albumIDList = [];


	//sort variables
	this.trackSort = true;
	this.artistSort = true;
	this.albumSort = true;
	this.popSort = true;

	/*	
	var _this = this;
	var getCookieQueue = function(){
		var tempQueue = $cookieStore.get("queue");
		for(song in tempQueue) { 
			_this.track.get({id:tempQueue[song]}, function(data) {
				console.log(data), 
				_this.queue.push(data);
			 });
		}
	}
	*/


	//calculates totalplaytime in playlist
	this.getPlaylistTime = function(playlist) {
		var runtime = 0;
		for (song in playlist) {
			runtime += playlist[song].duration_ms * 0.001;
		}

		var min = 0;
		var test = runtime;
		var rest=true;
		while (rest==true) {
			
			if (test-60 > 0) {
				test = test-60;
				min +=1;
			} 

			else {
				test = Math.round(test)
				rest=false;
			}

		}
		return [min, test];
	}

	this.updateCookieQueue = function() {
		var cookieQueue = [];
		for (song in this.queue) {
			cookieQueue.push(this.queue[song].id);
		}

		$cookieStore.put("queue", cookieQueue);
	}

	this.addToPlaylist = function(song) {
		this.queue.push(song);
		//this.updateCookieQueue();
	}

	this.resetPlaylist = function() {
		this.queue = [];
	}

	this.removeSong = function(id) {
		for (song in this.queue) {
			if (id == this.queue[song].id) {
				this.queue.splice(song,1);
			}
		}
	}

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

	this.getQueue = function() {
		return this.queue;
	}

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

	this.getAlbum = $resource('https://api.spotify.com/v1/albums/:id',{},{
    get: {
		}
	});

	return this;

	//getCookieQueue();

})