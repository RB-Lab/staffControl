describe('Manage controller', function() {

	beforeEach(module('Manage'));

	var mockScStorgae, mockRouteParams;

	beforeEach(function(){
		mockScStorgae = {
			getItem: jasmine
				.createSpy('thingsStorage.getItem')
				.andCallFake(function(id){
					return {id: id};
				})
		};

		mockRouteParams = {
			id: 'foo'
		};

		module(function ($provide) {
			$provide.value('thingsStorage', mockScStorgae);
			$provide.value('$routeParams', mockRouteParams);
		});

	});

	it('should have an item with ID taken from route params', function(){
		inject(function($controller) {
			var scope = {};
			$controller('Manage', {$scope:scope});
			expect(scope.item).toEqual({id: 'foo'});
		});

	});
});
