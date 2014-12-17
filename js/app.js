var scApp = angular.module('scApp', ['ngRoute', 'scControllers']);

scApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/inbox', {
				templateUrl: 'views/inbox.html',
				controller: 'Inbox'
			}).
			when('/manage/:id', {
				templateUrl: 'views/manage.html',
				controller: 'Manage'
			}).
			otherwise({
				redirectTo: '/inbox'
			});
	}]);
