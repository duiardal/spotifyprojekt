queueKle.controller('searchCtrl', function($scope,$rootScope,Spotify, Authentication) {

	var queue = Spotify.getQueue();

	$scope.searchArtist = function(input) {
		$scope.searchInput = input;
		Spotify.Artist.get({name:input}, function(output) {
			$scope.artistResult = output.artists.items;
		});
	}

	$scope.searchTracks = function(input) {
		Spotify.track.get({track:input}, function(output){
			$scope.trackResult = output.tracks.items;
		});
	}

	$scope.searchAlbums = function(input) {
		Spotify.album.get({name:input}, function(output) {
			$scope.albumResult = output.albums.items;
		});
	}

	//sorterar låtarna i bokstavsordning
	$scope.sortTracks = function() {
		var test = Spotify.trackSort;
		if (test == true) {
			$scope.trackResult.sort(function(a, b){
			    var x = a.name.toLowerCase();
			    var y = b.name.toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;});
				Spotify.trackSort = false;
		}
		else {
			$scope.trackResult.sort(function(a, b){
			    var x = a.name.toLowerCase();
			    var y = b.name.toLowerCase();
			    if (x > y) {return -1;}
			    if (x < y) {return 1;}
			    return 0;});
			Spotify.trackSort = true;
		}
	}

	//sorterar artisterna i bokstavsordning
	$scope.sortArtist = function() {
		var test = Spotify.artistSort;
		if (test == true) {
			$scope.trackResult.sort(function(a, b){
			    var x = a.artists[0].name.toLowerCase();
			    var y = b.artists[0].name.toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;});
				Spotify.artistSort = false;
		}
		else {
			$scope.trackResult.sort(function(a, b){
			    var x = a.artists[0].name.toLowerCase();
			    var y = b.artists[0].name.toLowerCase();
			    if (x > y) {return -1;}
			    if (x < y) {return 1;}
			    return 0;});
			Spotify.artistSort = true;

		}
	}

	//sorterar albumen i bokstavsordning
	$scope.sortAlbum = function() {
		var test = Spotify.albumSort;
		if (test == true) {
			$scope.trackResult.sort(function(a, b){
			    var x = a.album.name.toLowerCase();
			    var y = b.album.name.toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;});
				Spotify.albumSort = false;
		}
		else {
			$scope.trackResult.sort(function(a, b){
			    var x = a.album.name.toLowerCase();
			    var y = b.album.name.toLowerCase();
			    if (x > y) {return -1;}
			    if (x < y) {return 1;}
			    return 0;});
			Spotify.albumSort = true;
		}
	}

	//sorterar efter popularitet
	$scope.popularitySort = function() {
		var test = Spotify.popSort;
		if (test==true){
		$scope.trackResult.sort(function(a, b){return b.popularity - a.popularity});
		Spotify.popSort=false;

		}
		else {
			$scope.trackResult.sort(function(a, b){return a.popularity - b.popularity});
			Spotify.popSort=true;
		}
	}

	//Sends list to Search.html
	$scope.getList = function() {
		return Spotify.getQueue();
	}

	//beräknar köns playtime
	$scope.totalRuntime = function() {
		var playlist = Spotify.getQueue();
		var runtime = Spotify.getPlaylistTime(playlist);
		return runtime;
	}

	//Fills in favorited songs in Search
	$scope.favoriteSongs = function(id) {
		var result = "glyphicon glyphicon-star-empty";
		var key = $rootScope.currentUser.favorite_songs;
		for (song in key) {
			if (key[song].favorites.id == id){
				result = "glyphicon glyphicon-star";
			}
		}
		return result;
	}

	//Adds and removes songs in profil
	$scope.favoriteSong = function(track) {
		var symbol = document.getElementById(track.id);
		var send = [];
		var key = $rootScope.currentUser.favorite_songs;
		for (favo in key) {
			if (key[favo].favorites.id == track.id){
				send = favo;
			}
		}
		if (symbol.className == "glyphicon glyphicon-star") {
			Authentication.deleteFavorite(send);
		}
		else {
			Authentication.favoriteSong(track);
		}
	}

	//Sends queued symbol in search
	$scope.queueSongs = function(id) {
		var result = "glyphicon glyphicon-plus";
		var key = Spotify.getQueue();
		for (song in key) {
			if (key[song].id == id){
				result = "glyphicon glyphicon-minus";
			}
		}
		return result;
	}

	//Queue Songs
	$scope.queueSong = function(song) {
		var symbol = document.getElementById("queque" + song.id);

		if (symbol.className == "glyphicon glyphicon-minus") {
			$scope.removeSong(song.id);
		}

		else {
			symbol.className = "glyphicon glyphicon-minus";
			Spotify.addToPlaylist(song);
		}		
	}

	$scope.resetQueue = function() {
		Spotify.resetPlaylist();
	}

	$scope.removeSong = function(id) {
		Spotify.removeSong(id);
	}


	$scope.getAlbum = function(id) {
		Spotify.artistAlbum.get({
			id:id}, function(output) {
				//console.log(output);
				$scope.albumResult = output.items;
				$scope.artist = output.items[0].artists[0].name;
				//$scope.artistImg = output.items[0].images[0].url;
				for (albumID in $scope.albumResult) {
					Spotify.albumIDList.push($scope.albumResult[albumID].id);
				};
				//console.log(albumIDList);
				//return albumList;
		});
	}

	//Spelaren ...Fungerar inte!!!!!
	$scope.player = function(song) {
		var time = song.duration_ms;
		console.log(time);
		var bar = new ProgressBar.Line(player, {
			  strokeWidth: 2,
			  duration: time,
			  color: '#FFEA82',
			  trailColor: '#eee',
			  trailWidth: 1,
			  svgStyle: {width: '100%', height: '100%'},
			  from: {color: '#FFEA82'},
			  to: {color: '#ED6A5A'},
			  step: (state, bar) => {
			    bar.path.setAttribute('stroke', state.color);
			  }
			});

		bar.animate(1.0);  // Number from 0.0 to 1.0
	}

	//Ändrar ordningen i kön
    $scope.changeOrder = function() {
    	var test = Spotify.getQueue();
    	var list = [];
    	for (i in test) {
    		var checkbox = document.getElementById('test'+i);
    		if (checkbox.checked) {
    			list.push(parseInt(checkbox.value));
    		}
    	}
    	if (list.length == 2){ 
	    	var items = test;
	    	var NewItems = [];
	    	var itemOne = test[list[0]];
	    	//$scope.items.splice(list[0],1);
	    	var itemTwo = test[list[1]];
	    	//$scope.items.splice(list[1],1);
	    	for (i in test) {
	    		if (list[0] == i) {
	    			NewItems.push(itemTwo);
	    		}
	    		else if (list[1] == i) {
	    			NewItems.push(itemOne);
	    		}
	    		else {
	    			NewItems.push(test[i])
	    		}

	    	}
	    	Spotify.queue=NewItems;
	    }
    }
	
	//Checks that only two boxes can be checked
	$scope.checkCheckboxes = function() {
		var test = Spotify.getQueue();
    	var list = [];
    	for (i in test) {
    		var checkbox = document.getElementById('test'+i);

    		if (list.length == 2) {
    			checkbox.checked = false;
    			$scope.changeDirection(i);	
    			
    			}
    		
    		else if (checkbox.checked == true) {
    			list.push(parseInt(checkbox.value));
    		}

    		if (list.length==2) {
    			if (list[0] > list[1]) {
    				var symbol = document.getElementById("direction"+list[1]);
    				symbol.className = "glyphicon glyphicon-arrow-down";
    				var symbolTwo = document.getElementById("direction"+list[0]);
    				symbolTwo.className = "glyphicon glyphicon-arrow-up";

    			}

    			else if (list[1] > list[0]) {
    				var symbol = document.getElementById("direction"+list[0]);
    				symbol.className = "glyphicon glyphicon-arrow-down";
    				var symbolTwo = document.getElementById("direction"+list[1]);
    				symbolTwo.className = "glyphicon glyphicon-arrow-up";

    		}
    		if (checkbox==false) {
    			var symbol = document.getElementById('direction'+i);
    			symbol.className="hej"
    		}
    	}
    }
	}
	//Resets the symbol when unchecked
	$scope.changeDirection = function(index) {
		var symbol = document.getElementById("direction"+index);
		symbol.className = "hej";	

	}

	$scope.changeSymbol = function(id) {
		
	}



});


