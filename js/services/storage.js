var scStorage = angular.module('scStorage', ['angular-random-string', 'ngLodash']);


scStorage.factory('thingsStorage', ['$window', 'randomString', 'lodash', function(w, randomString, _){
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
		},
		getItem: function(id){
			return _.find(inbox, function(item){
				return id === item.id;
			});
		},
		getLastItem: function(){
			return inbox[inbox.length - 1];
		},
		save: function(){
			saveToLocalStorage();
		}
	};

}]);
