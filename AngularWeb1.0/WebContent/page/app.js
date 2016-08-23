angular.module('myApp', ['ngRoute','navApp','mainApp','headerApp'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl: "page/header.html",
		controller: "headerCtrl"
	})
	.when("/main",{
		templateUrl: 'page/main.html',
		controller: 'mainCtrl'
	})
	.when("/nav",{
		templateUrl: 'page/nav.html',
		controller: 'navCtrl'	
	})
	.otherwise({redirectTo: '/'});
}]);