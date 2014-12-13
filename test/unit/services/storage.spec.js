
describe('scStorage service', function() {
	beforeEach(module('scStorage'));

	var mockWindow, storageIsEmpty;

	beforeEach(function(){
		storageIsEmpty = true;
		mockWindow = {
			localStorage: {
				storage: {},
				setItem: function(key, value){
					this.storage[key] = value;
				},
				getItem: function(key) {
					if (key === 'inbox') {
						if(storageIsEmpty) return null;
						return JSON.stringify(['this is right array']);
					}
					return JSON.stringify(['this is wrong array']);
				}
			},
			Date: {
				now: function(){
					return 123;
				}
			}
		};

		module(function ($provide) {
			$provide.value('$window', mockWindow);
		});

	});

	it('initial things should be an ampty arry if stoarge is empty', function(){
		inject(function(thingsStorage){
			expect(thingsStorage.inbox).toEqual([]);
		});
	});

	it('should get initial things froom local storage if stoarge is NOT empty', function(){
		storageIsEmpty = false;
		inject(function(thingsStorage){
			expect(thingsStorage.inbox).toEqual(['this is right array']);
		});
	});

	it('should save things to local storage', function(){
		inject(function(thingsStorage) {
			expect(mockWindow.localStorage.storage).toEqual({});
			thingsStorage.addItemToInbox('foo');
			expect(mockWindow.localStorage.storage.inbox).toBeDefined();
			var inbox = JSON.parse(mockWindow.localStorage.storage.inbox);
			expect(inbox instanceof Array).toBe(true);
			expect(inbox.length).toEqual(1);
			expect(inbox[0].title).toEqual('foo');
			expect(inbox[0].created).toEqual(123);
		});
	});
});
