describe('scApp controllers', function() {
	beforeEach(module('scControllers'));

	// mock for localStorage
	beforeEach(function () {
		var store = {};

		spyOn(localStorage, 'getItem').andCallFake(function (key) {
			return store[key];
		});
		spyOn(localStorage, 'setItem').andCallFake(function (key, value) {
			return store[key] = value + '';
		});
		spyOn(localStorage, 'clear').andCallFake(function () {
			store = {};
		});
	});

	// mock for Date.now
	beforeEach(function () {
		var store = {};

		spyOn(Date, 'now').andCallFake(function (key) {
			return 123;
		});
	});

	it('should have inbox array', function(){
		inject(function($controller) {
			var scope = {},
				ctrl = $controller('Inbox', {$scope:scope});
			expect(scope.inbox instanceof Array).toBe(true);
			expect(scope.inbox.length).toEqual(0);
		});
	});

	it('should have newThig propery', function(){
		inject(function($controller) {
			var scope = {},
				ctrl = $controller('Inbox', {$scope:scope});
			expect(scope.newThing).toEqual('');
		});
	});

	it('should add new things', function(){
		inject(function($controller) {
			var scope = {},
				ctrl = $controller('Inbox', {$scope:scope});
			expect(scope.inbox.length).toEqual(0);
			scope.newThing = 'foo';
			scope.addNewThing();
			expect(Date.now).toHaveBeenCalled();
			expect(scope.inbox.length).toEqual(1);
			expect(scope.inbox[0].title).toEqual('foo');
			expect(scope.inbox[0].created).toEqual(123);
		});
	});

	it('save things to local storage', function(){
		inject(function($controller) {
			var scope = {},
				ctrl = $controller('Inbox', {$scope:scope});
			scope.newThing = 'foo';
			scope.addNewThing();
			expect(localStorage.setItem).toHaveBeenCalledWith('inbox', '[{"title":"foo","created":123}]');
		});
	});

});
