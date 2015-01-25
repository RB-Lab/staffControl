var scApp = angular.module('scApp', ['ngRoute', 'inboxController', 'manageController']);

scApp.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/inbox', {
				templateUrl: 'views/inbox.html',
				controller: 'InboxController'
			}).
			when('/manage/:id', {
				templateUrl: 'views/manage.html',
				controller: 'ManageController'
			}).
			when('/manage-action/:id', {
				templateUrl: 'views/manage-action.html',
				controller: 'ManageActionController'
			}).
			when('/manage-not-action/:id', {
				templateUrl: 'views/manage-not-action.html',
				controller: 'ManageNotActionController'
			}).
			otherwise({
				redirectTo: '/inbox'
			});
	}
]);
