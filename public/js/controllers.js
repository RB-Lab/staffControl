var scControllers = angular.module('scControllers', []);

scControllers.controller('inbox', function($scope){
	$scope.inbox = [];

	$scope.newThing = '';
	$scope.addNewThing = function(){
		if($scope.newThing === '') return;
		$scope.inbox.push({title: $scope.newThing, created: Date.now()});
		$scope.newThing = '';
	};
});
