angular.module('Manage', ['scStorage']).controller('Manage', [
	'$scope',
	'$routeParams',
	'thingsStorage',
	function($scope, $routeParams, thingsStorage) {

	$scope.item = thingsStorage.getItem($routeParams.id);

}]);
