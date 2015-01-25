angular.module('manageController', ['scStorage']).controller('ManageController', [
	'$scope',
	'$routeParams',
	'$location',
	'thingsStorage',
	function(
		$scope,
		$routeParams,
		$location,
		thingsStorage){

			$scope.item = thingsStorage.getItem($routeParams.id);

			$scope.itIsAction = function(isIt){
				$scope.item.isAction = isIt;
				thingsStorage.save();
				var path = '/';
					path += isIt ? 'manage-action' : 'manage-not-action';
					path += '/' + $scope.item.id;
				$location.path(path);
			};
		}
]);
