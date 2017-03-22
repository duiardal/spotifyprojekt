app.factory('Spotify',function ($resource) {

	this.apiArtistSearch = $resource('https://api.spotify.com/v1/search?q=:id&type=artist',{},{
    get: {
		}
	});

	this.apiGetAlbumFromArtistId = $resource('https://api.spotify.com/v1/artists/:id/albums',{},{
    get: {
		}
	});

	return this;

})