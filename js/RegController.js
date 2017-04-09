queueKle.controller('RegController', ['$scope', 'Authentication', 'Spotify',
	function($scope, Authentication, Spotify) {

	$scope.login = function() {
		Authentication.login($scope.user);
	};

	$scope.logout = function() {
		Authentication.logout();
	};

	$scope.register = function() {
		Authentication.register($scope.user);
	}; //register

	$scope.savePlaylist = function(playlistName) {
		var playlist = Spotify.getQueue();
		Authentication.createPlaylist(playlistName, playlist);
	}

	$scope.getPlaylist = function() {
		Authentication.getPlaylists();
	}

	$scope.removePlaylist = function(playlistId) {
		console.log(playlistId);
		Authentication.deletePlaylist(playlistId);
	}

	$scope.changeEmail = function(email) {
		Authentication.changeEmail(email);
	}

	$scope.changePassword = function(email) {
		Authentication.changePassword(email);
	}

	$scope.changeUsername = function(username) {
		Authentication.changeUsername(username);
	}

	$scope.userSearch = function(username) {
		Authentication.userSearch(username);
	}

	$scope.addUserToProfile = function(user) {
		$scope.friendAdded = user;
		Authentication.addUserToProfile(user);
	}

	$scope.deleteUserFromProfile = function(user) {
		Authentication.deleteUserFromProfile(user);
	}

	$scope.upvotePlaylist = function(key, nyckel) {
		Authentication.upvotePlaylist(key, nyckel);
	}

	$scope.downvotePlaylist = function(key, nyckel) {
		Authentication.downvotePlaylist(key, nyckel);
	}

	$scope.upvotePlaylist2 = function(key, nyckel) {
		Authentication.upvotePlaylist2(key, nyckel);
	}

	$scope.downvotePlaylist2 = function(key, nyckel) {
		Authentication.downvotePlaylist2(key, nyckel);
	}

	$scope.favoriteSong = function(track) {
		Authentication.favoriteSong(track);
	}

	$scope.deleteFavorite = function(track) {
		Authentication.deleteFavorite(track);
	}


}]); //Controller