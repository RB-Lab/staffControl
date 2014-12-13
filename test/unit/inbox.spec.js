describe('scApp controllers', function() {
	beforeEach(module('scControllers'));

	var mockScStorgae;

	beforeEach(function(){

		mockScStorgae = {
			inbox: [1,1,1],
			addItemToInbox: function(name){
				this.inbox.push(name);
			}
		};

		module(function ($provide) {
			$provide.value('thingsStorage', mockScStorgae);
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

});
