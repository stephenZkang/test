angular.module('myApp')
.controller('mainCtrl', function($scope,$http,$timeout) {
	$scope.names=[
	              {name:'Jani',country:'Norway',color:'red'},
	              {name:'Hege',country:'Sweden',color:'yellow'},
	              {name:'Kai',country:'Denmark',color:'blue'}
	           ];
	       	$timeout($timeout(function() {
	       		$scope.names=[
	                 {name:'科比',country:'American',color:'green'},
	                 {name:'龙五',country:'HongKong',color:'blue'},
	                 {name:'发哥',country:'ZiJiage',color:'orange'}
	              ];
	       	}, 2000));
	       	
	       	$scope.firstName = "John";
	           $scope.lastName = "Doe";
	           $scope.myVar = false;
	           $scope.toggle = function() {
	               $scope.myVar = !$scope.myVar;
	           };
	           
	       	/*$http.get('names.json').success(function(response) {
	       		$scope.names =response.records;
	       		
	       	});*/
});