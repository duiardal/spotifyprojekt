queueKle.controller('RegController', ['$scope', 'Authentication', 'Spotify', '$routeParams', '$rootScope', 
	function($scope, Authentication, Spotify, $routeParams, $rootScope) {
	
	var route = $routeParams;
	var rootballs = $rootScope;
	var friendList = [];
	$scope.userInput = false;

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
	};

	$scope.getPlaylist = function() {
		Authentication.getPlaylists();
	};

	$scope.removePlaylist = function(playlistId) {
		console.log(playlistId);
		Authentication.deletePlaylist(playlistId);
	};

	$scope.changeEmail = function(email) {
		Authentication.changeEmail(email);
	};

	$scope.changePassword = function(email) {
		Authentication.changePassword(email);
	};

	$scope.changeUsername = function(username) {
		Authentication.changeUsername(username);
	};

	$scope.userSearch = function(id) {
		$scope.findAllUsers = Authentication.userSearch(id);
	};

	$scope.addUserToProfile = function(user) {
		$scope.friendAdded = user;
		Authentication.addUserToProfile(user);
	};

	$scope.deleteUserFromProfile = function(user) {
		Authentication.deleteUserFromProfile(user);
	};

	$scope.upvotePlaylist = function(key, nyckel) {
		Authentication.upvotePlaylist(key, nyckel);
	};

	$scope.downvotePlaylist = function(key, nyckel) {
		Authentication.downvotePlaylist(key, nyckel);
	};

	$scope.favoriteSong = function(track) {
		Authentication.favoriteSong(track);
	};

	$scope.deleteFavorite = function(track) {
		Authentication.deleteFavorite(track);
	};

	$scope.getUsersPlaylist = function(key, object, playId) {
		Authentication.usersPlaylist(key, object, playId);

	};

	$scope.searchUser = function(user) {
		$scope.userInput = true;
		Authentication.searchUser(user);
	};


	/*$scope.getCurrentFriend = function(allUsers) {
		
	};

	$scope.getUserInfo = function() {
		Authentication.userSearch();
		//return route.id;
	};*/



}]); //Controller