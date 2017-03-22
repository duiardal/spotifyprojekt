var app = angular.module('spotifyApp', ['ngRoute','ngResource']);


app.config(['$routeProvider',
function($routeProvider) {
    $routeProvider.
	when('/home', {
    	templateUrl: 'partials/home.html',
    	controller: 'MainCtrl'
  	}).
  // TODO in Lab 5: add more conditions for the last two screens (overview and preparation)
  	otherwise({
    	redirectTo: '/home'
  	});
	}]);