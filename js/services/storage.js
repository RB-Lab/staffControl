var scStorage = angular.module('scStorage', ['randomString']);

scStorage.factory('thingsStorage', ['$window', 'randomString', function(w, randomString){
	var storage = w.localStorage;

	var inbox = getFromLocalStorage();

	function saveToLocalStorage(){
		storage.setItem('inbox', angular.toJson(inbox));
	}

	function getFromLocalStorage(){
		var inbox = storage.getItem('inbox');
		if (inbox) return JSON.parse(inbox);
		return [];
	}

	return {
		inbox: inbox,
		addItemToInbox: function(name){
			inbox.push({id: randomString(8), title: name, created: w.Date.now()});
			saveToLocalStorage();
		}
	};

}]);
