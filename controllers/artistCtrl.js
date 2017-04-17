queueKle.controller('artistCtrl', function($scope, Spotify, $routeParams) {
	//Checks that the page is loaded once
	if (Spotify.artistCtrl == false) {
		var name = $routeParams
		//retrives the artist albums
		Spotify.artistAlbum.get({
			id:name.id}, function(output) {
				$scope.albumResult = output.items;

				$scope.artist = output.items[0].artists[0].name;
		});
		//retrives artist
		Spotify.getArtist.get({
			id:name.id}, function(output) {
				$scope.artistImg = output.images[0].url;
				$scope.genres = output.genres;
			}
		);
	Spotify.artistCtrl = true;
	}
	}
);
