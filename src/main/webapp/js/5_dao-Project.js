

(function($){

	
	function ProjectDao(){
		this.constructor._super.constructor.call(this,"Project");
	}
	brite.inherit(ProjectDao,brite.dao.RemoteDao);
	
	ProjectDao.prototype.addUser = function(objectType, data) {
		var reqData = {
			action : "addUser",
			objType : objectType,
			objJson : JSON.stringify(data)
		};
		var dfd = $.ajax({
			type : "POST",
			url : jsonUrl,
			data : reqData,
			dataType : "json"
		}).pipe(function(val) {
 			return val;
		});

		return dfd.promise();
	}
	
	ProjectDao.prototype.removeUser = function(objectType, data) {
		var reqData = {
			action : "removeUser",
			objType : objectType,
			objJson : JSON.stringify(data)
		};
		var dfd = $.ajax({
			type : "POST",
			url : jsonUrl,
			data : reqData,
			dataType : "json"
		}).pipe(function(val) {
 			return val;
		});

		return dfd.promise();
	}
	
	brite.registerDao("Project", new ProjectDao());
	
	
})(jQuery);