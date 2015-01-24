var scApp = angular.module('scApp', ['ngRoute', 'Inbox', 'Manage']);

scApp.config([
	'$routeProvider',
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
			when('/manage-action/:id', {
				templateUrl: 'views/manage-action.html',
				controller: 'ManageAction'
			}).
			when('/manage-not-action/:id', {
				templateUrl: 'views/manage-not-action.html',
				controller: 'ManageNotAction'
			}).
			otherwise({
				redirectTo: '/inbox'
			});
	}
]);
