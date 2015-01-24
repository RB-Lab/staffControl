describe('Manage controller', function() {

	beforeEach(module('Manage'));

	var mockScStorgae, mockRouteParams, mockLocation;

	beforeEach(function(){
		mockScStorgae = {
			getItem: jasmine
				.createSpy('thingsStorage.getItem')
				.andCallFake(function(id){
					return {id: id};
				}),
			save: jasmine
				.createSpy('thingsStorage.save')
		};

		mockRouteParams = {
			id: 'foo'
		};

		mockLocation = {
			path: jasmine.createSpy('$location.path')
		};

		module(function ($provide) {
			$provide.value('thingsStorage', mockScStorgae);
			$provide.value('$routeParams', mockRouteParams);
			$provide.value('$location', mockLocation);
		});

	});

	it('should have an item with ID taken from route params', function(){
		inject(function($controller) {
			var scope = {};
			$controller('Manage', {$scope:scope});
			expect(scope.item).toEqual({id: 'foo'});
		});
	});

	it('should set "isAction" and go further (it is action)', function(){
		inject(function($controller) {
			var scope = {};
			$controller('Manage', {$scope:scope});
			scope.itIsAction(true);
			expect(scope.item.isAction).toEqual(true);
			expect(mockScStorgae.save).toHaveBeenCalled();
			expect(mockLocation.path)
				.toHaveBeenCalledWith('/manage-action/foo');
		});
	});

	it('should set "isAction" and go further (it is not action)', function(){
		inject(function($controller) {
			var scope = {};
			$controller('Manage', {$scope:scope});
			scope.itIsAction(false);
			expect(scope.item.isAction).toEqual(false);
			expect(mockScStorgae.save).toHaveBeenCalled();
			expect(mockLocation.path)
				.toHaveBeenCalledWith('/manage-not-action/foo');
		});
	});
});
