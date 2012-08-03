

(function($){

	
	function ProjectDao(){
		this.constructor._super.constructor.call(this,"Project");
	}
	brite.inherit(ProjectDao,brite.dao.RemoteDao);
	
	ProjectDao.prototype.addUser = function(objectType, data) {
		var reqData = {
			action : "addUser",
			objType : objectType,
			userId:data.userId,
			projectId:data.projectId
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
			userId:data.userId,
			projectId:data.projectId
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
	
	ProjectDao.prototype.getCreateProjects = function(objectType, opts) {
		var data = {
			objType : objectType
		};

		if(opts) {
			data.userId = opts.userId;
		}
		return $.ajax({
			type : "GET",
			url : contextPath + "/getCreateProjects.json",
			data : data,
			dataType : "json"
		}).pipe(function(val) {
			return val.projects;
		});
	}
	ProjectDao.prototype.getJoinProjects = function(objectType, opts) {
		var data = {
			objType : objectType
		};

		if(opts) {
			data.userId = opts.userId;
		}
		return $.ajax({
			type : "GET",
			url : contextPath + "/getJoinProjects.json",
			data : data,
			dataType : "json"
		}).pipe(function(val) {
			return val.projects;
		});
	}
	
	ProjectDao.prototype.getUsersNotInProject = function(objectType, opts) {
		var data = {
			objType : objectType
		};

		if(opts) {
			data.projectId = opts.projectId;
		}
		return $.ajax({
			type : "GET",
			url : contextPath + "/getUsersNotInProject.json",
			data : data,
			dataType : "json"
		}).pipe(function(val) {
			return val.users;
		});
	}
	
	brite.registerDao("Project", new ProjectDao());
	
	
})(jQuery);