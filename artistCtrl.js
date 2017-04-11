queueKle.controller('artistCtrl', function($scope, Spotify, $routeParams) {

	var albumIDList = [];

	if (Spotify.artistCtrl === false) {
		var name = $routeParams
		Spotify.artistAlbum.get({
			id:name.id}, function(output) {
				$scope.albumResult = output.items;
				$scope.artist = output.items[0].artists[0].name;
				for (albumID in $scope.albumResult) {
					albumIDList.push($scope.albumResult[albumID].id);
				};

		});
		Spotify.getArtist.get({
			id:name.id}, function(output) {
				$scope.artistImg = output.images[0].url;
			}
		);

		$scope.getAlbumTracks = function(id) {
			Spotify.getTrack.get({
				id:id}, function(output) {
					$scope.albumTracks = output.items;
				}
		)};
		
	Spotify.artistCtrl = true;
	}
	}
);

