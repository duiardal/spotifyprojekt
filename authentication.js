queueKle.factory('Authentication',
  ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth', '$firebaseArray',
  function($rootScope, $location, $firebaseObject, $firebaseAuth, $firebaseArray) {

  var ref = firebase.database().ref("users");
  var auth = $firebaseAuth();
  var list = $firebaseArray(ref);
  var myObject;
  $rootScope.error = null;

  auth.$onAuthStateChanged(function(authUser) {
    if(authUser) {
      var userRef = ref.child(authUser.uid);
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
      console.log($rootScope.currentUser);
    } else {
      $rootScope.currentUser = '';
    }
  });

  myObject = {
    login: function(user) {
      auth.$signInWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(user) {
        $location.path('/search');
      }).catch(function(error) {
        console.log(error);
        $rootScope.error = error;
        $rootScope.message = error.message;
      }); //signInWithEmailAndPassword
    }, //login

    logout: function() {
      auth.$signOut();
      $location.path('/home');
    }, //logout

    requireAuth: function() {
      return auth.$requireSignIn();
    }, //require Authentication

    register: function(user) {
      auth.$createUserWithEmailAndPassword(
        user.email,
        user.password,
        user.username
      ).then(function(regUser) {
          ref.child(regUser.uid).set({
            email: user.email,
            password: user.password,
            username: user.username,
            id: regUser.uid,
            playlists: ''
          });
          myObject.login(user);
          $location.path('/search');
      }).catch(function(error) {
        $rootScope.message = error.message;
      }); //createUserWithEmailAndPassword
    }, //register

    createPlaylist: function(playlistName, playlist) {
      var list = $firebaseArray(ref.child($rootScope.currentUser.id).child("playlists"));
      list.$add({
        playlists: playlist,
        PlaylistName: playlistName,
        Ranking: 0
      })
      .then(function(ref) {
        var id = ref.key;
        console.log("added record with id " + id);
        list.$indexFor(id);
      });
    },

    upvotePlaylist: function(key, nyckel) {
      var reference2 = $firebaseObject(ref.child(key).child("playlists").child(nyckel));
      reference2.$loaded().then(function(reference){
        reference2.Ranking += 1;
        reference2.$save().then(function() {
          $rootScope.currentRating = reference2.Ranking;
          console.log("Playlist upvoted");
        })
      })
    },

    /*upvotePlaylist2: function(key, nyckel) {
      var reference = $firebaseObject(ref.child($rootScope.currentUser.id).child("friends").child(key).child("friend").child("playlists").child(nyckel));
      reference.$loaded().then(function(reference){
        reference.Ranking += 1;
        reference.$save().then(function() {
        })
      })
    },*/

    downvotePlaylist: function(key, nyckel) {
      var reference2 = $firebaseObject(ref.child(key).child("playlists").child(nyckel));
      reference2.$loaded().then(function(reference){
        reference2.Ranking -= 1;
        reference2.$save().then(function() {
          $rootScope.currentRating = reference2.Ranking;
          console.log("Playlist downvoted");
        })
      })
    },

    /*downvotePlaylist2: function(key, nyckel) {
      var reference = $firebaseObject(ref.child($rootScope.currentUser.id).child("friends").child(key).child("friend").child("playlists").child(nyckel));
      reference.$loaded().then(function(reference){
        reference.Ranking -= 1;
        reference.$save().then(function() {
        })
      })
    },*/

    deletePlaylist: function(playlistId) {
      var list = $firebaseArray(ref.child($rootScope.currentUser.id).child("playlists"));
      list.$loaded().then(function(list){
        console.log(list.$getRecord(playlistId));
        var item = list.$getRecord(playlistId);
        list.$remove(item).then(function(ref) {
          ref.key === item.$id; // true
        })
      });
      //list.$remove(list.$getRecord(playlistId));
    },

    changeEmail: function(email) {
      var reference = $firebaseObject(ref.child($rootScope.currentUser.id));
      reference.$loaded().then(function(reference){
        reference.email = email;
        reference.$save().then(function() {
          console.log("success"); // true
          auth.$updateEmail(email).then(function() {
            console.log("Email changed in authentication-module!");
          }).catch(function(error) {
            console.log(error);
            $rootScope.error = error;
            $rootScope.message = error.message;
          });
        });
      })
    },

    changePassword: function(password) {
      var reference = $firebaseObject(ref.child($rootScope.currentUser.id));
      reference.$loaded().then(function(reference){
        reference.password = password;
        reference.$save().then(function() {
          console.log("success"); // true
          auth.$updatePassword(password).then(function() {
            console.log("Email changed in authentication-module!");
          }).catch(function(error) {
            console.log(error);
            $rootScope.error = error;
            $rootScope.message = error.message;
          });
        });
      })
    },

    changeUsername: function(username) {
      var reference = $firebaseObject(ref.child($rootScope.currentUser.id));
      reference.$loaded().then(function(reference){
        reference.username = username;
        reference.$save().then(function() {
          console.log("success"); // true
        });
      })
    },

    userSearch: function(id) {
      var reference = $firebaseArray(ref);
      reference.$loaded().then(function(reference){
        for (obj in reference) {
          if (reference[obj].id == id) {
            $rootScope.selUser = reference[obj];
            console.log($rootScope.selUser);
            console.log($rootScope.currentUser);
          }
        }
      })
    },

    usersPlaylist : function(key, object, playName) {
      var reference = $firebaseArray(ref);
      var thisUser;
      reference.$loaded().then(function(reference) {
        console.log(reference);
        console.log(object);
        console.log(playName);
        for (obj in reference) {
          if (reference[obj].id == object.id) {
            thisUser = reference[obj];
            for (playList in thisUser.playlists) {
              if (thisUser.playlists[playList].PlaylistName == playName) {
                $rootScope.selectedUser = thisUser.playlists[playList];
                $rootScope.playlistKey = key;
                $rootScope.currentRating = thisUser.playlists[playList].Ranking;
              }
            }
          }
        }
      })
    },

    addUserToProfile: function(user) {
      var reference = $firebaseArray(ref.child($rootScope.currentUser.id).child("friends"));
      reference.$add({
        friend: user
      }).then(function(reference) {
        var id = reference.key;
        console.log("added record with id " + id);
      })
    },
    

    deleteUserFromProfile: function(user) {
      var list = $firebaseArray(ref.child($rootScope.currentUser.id).child("friends"));
      list.$loaded().then(function(list){
        console.log(list.$getRecord(user));
        var item = list.$getRecord(user);
        list.$remove(item).then(function(ref) {
          ref.key === item.$id; // true
        })
      });
      //list.$remove(list.$getRecord(playlistId));
    },

    favoriteSong: function(track) {
      var list = $firebaseArray(ref.child($rootScope.currentUser.id).child("favorite_songs"));
      list.$loaded().then(function(list){
      list.$add({
        favorites: track}).then(function() {
          console.log("Song added to favorites");
        })
      });
      //list.$remove(list.$getRecord(playlistId));
    },

    deleteFavorite: function(track) {
      console.log("hej");
      var list = $firebaseArray(ref.child($rootScope.currentUser.id).child("favorite_songs"));
      list.$loaded().then(function(list){
        var item = list.$getRecord(track);
        list.$remove(item).then(function(ref) {
          console.log("yo");
          //ref.key === item.$id; // true
        })
      });
      //list.$remove(list.$getRecord(playlistId));
    },

    searchUser: function(substring){
      var reference = $firebaseArray(ref);
      reference.$loaded()
      .then(function(reference) {
        for (i in reference) {
          var string = reference[i].username;
          if (string.indexOf(substring) !== -1) {
            $rootScope.searchedUser = reference[i];
            return
          }
        }
      })
      .catch(function(error) {
        $rootScope.error = error;
        $rootScope.message = "User not found!";
      })
    },



  }; //return


  return myObject;

}]); //factory