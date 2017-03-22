app.controller('MainCtrl', function ($scope,Spotify) {

	$scope.artistSearch = function(id) {
		Spotify.apiArtistSearch.get({id:id},function(data){
			console.log(data.artists.items[0]);
			$scope.artist=data;
			Spotify.apiGetAlbumFromArtistId.get({id:data.artists.items[0].id}, function(data2){
				$scope.album=data2;
				console.log(data2.items);
			},function(data2){
				$scope.status="There was an error";
			});
		},function(data){
			$scope.status = "There was an error";
		});
	};

})