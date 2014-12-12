var scStorage = angular.module('scStorage', []);

scStorage.factory('thingsStorage', ['$window', function(w){
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
			inbox.push({title: name, created: Date.now()});
			saveToLocalStorage();
		}
	};

}]);
