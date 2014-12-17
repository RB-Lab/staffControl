var scControllers = angular.module('scControllers', ['scStorage']);

scControllers.controller('Inbox', ['$scope', 'thingsStorage', function($scope, thingsStorage){
	$scope.inbox = thingsStorage.inbox;
	$scope.newThing = '';
	$scope.addNewThing = function(){
		if($scope.newThing === '') return;
		thingsStorage.addItemToInbox($scope.newThing);
		$scope.newThing = '';
	};
}]);