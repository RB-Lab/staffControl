
describe('scStorage service', function() {
	beforeEach(module('scStorage'));

	var mockWindow, inbox, mockRandomString;

	beforeEach(function(){
		inbox = null;
		mockWindow = {
			localStorage: {
				setItem: jasmine.createSpy('setItem').andCallFake(function(){
					inbox = arguments[1]
				}),
				getItem: jasmine.createSpy('getItem').andCallFake(function(){
					return inbox;
				})
			},
			Date: {
				now: jasmine.createSpy('now').andReturn(123)
			}
		};

		module(function ($provide) {
			$provide.value('$window', mockWindow);
		});

		mockRandomString = jasmine.createSpy().andReturn('foobar');

		module(function ($provide) {
			$provide.value('randomString', mockRandomString);
		});

	});

	it('initial things should be an ampty arry if stoarge is empty', function(){
		inject(function(thingsStorage){
			expect(mockWindow.localStorage.getItem).toHaveBeenCalledWith('inbox');
			expect(thingsStorage.inbox).toEqual([]);
		});
	});

	it('should get initial things froom local storage if stoarge is NOT empty', function(){
		inbox = '"foo"'; // value in inbox should be valid JSON.
		inject(function(thingsStorage){
			expect(mockWindow.localStorage.getItem).toHaveBeenCalledWith('inbox');
			expect(thingsStorage.inbox).toEqual('foo');
		});
	});

	it('should save things to local storage', function(){
		inject(function(thingsStorage) {
			thingsStorage.addItemToInbox('foo');
			expect(mockWindow.Date.now).toHaveBeenCalled();
			// I'm not using toHaveBeenCalledWith('inbox', 'right JSON') to be able to check only backward compatibility
			// of new variations of Thing's model instead of checking instad of checking complete equivalence
			expect(mockWindow.localStorage.setItem.mostRecentCall.args[0]).toEqual('inbox');
			inbox = JSON.parse(inbox);
			expect(inbox instanceof Array).toBe(true);
			expect(inbox.length).toEqual(1);
			expect(mockRandomString).toHaveBeenCalledWith(8);
			expect(inbox[0].id).toEqual('foobar');
			expect(inbox[0].title).toEqual('foo');
			expect(mockWindow.Date.now).toHaveBeenCalled();
			expect(inbox[0].created).toEqual(123);
		});
	});
});
