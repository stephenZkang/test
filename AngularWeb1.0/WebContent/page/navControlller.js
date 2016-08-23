var navApp = angular.module('navApp', []);
navApp.controller('navCtrl', function($scope) {
	$scope.name = 'Join';
	$scope.age = 25;
});

navApp.directive('run', function(){
	return {
		restrict: "A",	// E 作为元素名使用 	A 作为属性使用 C 作为类名使用 M 作为注释使用
		template:'<h1>自定义指令</h1>'
	};
});