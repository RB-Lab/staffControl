angular.module('inboxController', ['scStorage']).controller('InboxController', [
	'$scope',
	'$location',
	'thingsStorage',
	function($scope, $location, thingsStorage){

		$scope.inbox = thingsStorage.inbox;
		$scope.newThing = '';
		$scope.addNewThing = function(){
			if($scope.newThing === '') return;
			thingsStorage.addItemToInbox($scope.newThing);
			$scope.newThing = '';
		};
		$scope.addAndManage = function(){
			if($scope.newThing === '') return;
			$scope.addNewThing();
			$location.path('/manage/' + thingsStorage.getLastItem().id);
		};
	}
]);
