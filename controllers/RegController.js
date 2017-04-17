queueKle.controller('RegController', ['$scope','$routeParams','$rootScope', 'Authentication', 'Spotify',
	function($scope,$routeParams,$rootScope,Authentication,Spotify) {

	var route = $routeParams;
	var rootballs = $rootScope;
	$scope.userInput = false;
	//Login
	$scope.login = function(user) {
		Authentication.login(user);
	};
	//Logout
	$scope.logout = function() {
		Authentication.logout();
	};
	//register
	$scope.register = function() {
		Authentication.register($scope.user);
	}; 
	//Saves the playlist
	$scope.savePlaylist = function(playlistName) {
		var playlist = Spotify.getQueue();
		Authentication.createPlaylist(playlistName, playlist);
	}
	//Retrives the playlist
	$scope.getPlaylist = function() {
		Authentication.getPlaylists();
	}
	//Removes the playlist
	$scope.removePlaylist = function(playlistId) {
		console.log(playlistId);
		Authentication.deletePlaylist(playlistId);
	}
	//Changes the email-adress for Users Account
	$scope.changeEmail = function(email) {
		Authentication.changeEmail(email);
	}
	//Changes the password for Users Account
	$scope.changePassword = function(email) {
		Authentication.changePassword(email);
	}
	//Changes username for Users Account
	$scope.changeUsername = function(username) {
		Authentication.changeUsername(username);
	}
	//Search for a user?
	$scope.userSearch = function(username) {
		Authentication.userSearch(username);
	}
	//Add friend
	$scope.addUserToProfile = function(user) {
		$scope.friendAdded = user;
		Authentication.addUserToProfile(user);
	}
	//Delete friend
	$scope.deleteUserFromProfile = function(user) {
		Authentication.deleteUserFromProfile(user);
	}
	//Upvote playlist?
	$scope.upvotePlaylist = function(key, nyckel) {
		console.log("bajs");
		console.log(key,nyckel);
		Authentication.upvotePlaylist(key, nyckel);
	}
	//Downvote playlist?
	$scope.downvotePlaylist = function(key, nyckel) {
		Authentication.downvotePlaylist(key, nyckel);
	}
	//Favorite song
	$scope.favoriteSong = function(track) {
		Authentication.favoriteSong(track);
	}
	//Delete favorite song
	$scope.deleteFavorite = function(track) {
		Authentication.deleteFavorite(track);
	}
	//Retrives a users playlist
	$scope.getUsersPlaylist = function(key, object, playId) {
		Authentication.usersPlaylist(key, object, playId);

	};
	//Search for a user
	$scope.searchUser = function(user) {
		$scope.userInput = true;
		Authentication.searchUser(user);
	};
}]); 