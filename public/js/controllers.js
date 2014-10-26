var scControllers = angular.module('scControllers', []);

scControllers.controller('Inbox', function($scope){
	$scope.inbox = getFromLocalStorage();

	function saveToLocalStorage(){
		localStorage.setItem('inbox', angular.toJson($scope.inbox));
	}

	function getFromLocalStorage(){
		var inbox = localStorage.getItem('inbox');
		if (inbox) return JSON.parse(inbox);
		return [];
	}

	$scope.newThing = '';
	$scope.addNewThing = function(){
		if($scope.newThing === '') return;
		$scope.inbox.push({title: $scope.newThing, created: Date.now()});
		$scope.newThing = '';
		saveToLocalStorage();
	};
});
