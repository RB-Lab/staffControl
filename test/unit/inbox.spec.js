describe('scApp controllers', function() {
	beforeEach(module('scControllers'));

	var mockScStorgae, mockLocation;

	beforeEach(function(){

		mockScStorgae = {
			inbox: [1,1,1],
			addItemToInbox: function(name){
				this.inbox.push(name);
			},
			getLastItem: function(){
				return {id: 'foo'};
			}
		};

		mockLocation = {
			path: jasmine.createSpy('$location.path')
		};

		module(function ($provide) {
			$provide.value('thingsStorage', mockScStorgae);
			$provide.value('$location', mockLocation);
		});

	});


	it('should have inbox array taken from scThingsStorage', function(){
		inject(function($controller) {
			var scope = {};
			$controller('Inbox', {$scope:scope});
			expect(scope.inbox).toEqual(mockScStorgae.inbox);
		});
	});

	it('should have newThig propery', function(){
		inject(function($controller) {
			var scope = {};
			$controller('Inbox', {$scope:scope});
			expect(scope.newThing).toEqual('');
		});
	});

	it('should add new things', function(){
		inject(function($controller) {
			var scope = {};
			$controller('Inbox', {$scope:scope});
			expect(scope.inbox.length).toEqual(3);
			scope.newThing = 'foo';
			scope.addNewThing();
			expect(scope.inbox.length).toEqual(4);
			expect(scope.inbox[3]).toEqual('foo');
		});
	});

	it('shouldn\'t add empty strings', function(){
		inject(function($controller){
			var scope = {};
			$controller('Inbox', {$scope:scope});
			expect(scope.inbox.length).toEqual(3);
			scope.addNewThing();
			expect(scope.inbox.length).toEqual(3);
		});
	});

	it('should add and send me manage things', function(){
		inject(function($controller){
			var scope = {};
			$controller('Inbox', {$scope:scope});
			scope.newThing = 'foo';
			scope.addAndManage();
			expect(mockLocation.path).toHaveBeenCalledWith('/manage/foo');
		});
	});

	it('shouldn\'t add & manage empty strings', function(){
		inject(function($controller){
			var scope = {};
			$controller('Inbox', {$scope:scope});
			scope.addAndManage();
			expect(mockLocation.path.calls.length).toEqual(0);
		});
	});

});
