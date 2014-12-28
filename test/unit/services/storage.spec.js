
describe('scStorage service', function() {
	beforeEach(module('scStorage'));

	var mockWindow, inbox, mockRandomString;

	beforeEach(function(){
		inbox = null;
		mockWindow = {
			localStorage: {
				setItem: jasmine.createSpy('setItem').andCallFake(function(){
					inbox = arguments[1];
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
			expect(mockWindow.localStorage.setItem.mostRecentCall.args[0]).toEqual('inbox');
			inbox = JSON.parse(inbox);
			expect(inbox instanceof Array).toBe(true);
			expect(inbox.length).toEqual(1);
		});
	});

	it('should save thing with id 8 chars length', function(){
		inject(function(thingsStorage){
			thingsStorage.addItemToInbox('foo');
			inbox = JSON.parse(inbox);
			expect(mockRandomString).toHaveBeenCalledWith(8);
			expect(inbox[0].id).toEqual('foobar');
		});
	});

	it('should save thing with title passed', function(){
		inject(function(thingsStorage){
			thingsStorage.addItemToInbox('foo');
			inbox = JSON.parse(inbox);
			expect(inbox[0].title).toEqual('foo');
		});
	});

	it('should save thing created at current moment of time', function(){
		inject(function(thingsStorage){
			thingsStorage.addItemToInbox('foo');
			inbox = JSON.parse(inbox);
			expect(mockWindow.Date.now).toHaveBeenCalled();
			expect(inbox[0].created).toEqual(123);
		});
	});

	it('should get item by id', function(){
		inject(function(thingsStorage){
			thingsStorage.addItemToInbox('foo');
			inbox = JSON.parse(inbox);
			expect(thingsStorage.getItem('foobar')).toEqual(inbox[0]);
		});
	});

	it('should get last item', function(){
		inject(function(thingsStorage){
			thingsStorage.addItemToInbox('foo');
			inbox = JSON.parse(inbox);
			expect(thingsStorage.getLastItem()).toEqual(inbox[inbox.length - 1]);
		});
	});
});
