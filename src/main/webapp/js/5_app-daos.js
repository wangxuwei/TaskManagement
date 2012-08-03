var app = app || {};


// --------- Entity Dao Registration --------- //
(function($){
	
	if(app.mock){
		var databaseOptions = {
				fileName: "TaskManagement",
				version: "1.0",
				displayName: "TaskManagement",
				maxSize: 1024
		};
		
		app.SQLiteDB = openDatabase(
				databaseOptions.fileName,
				databaseOptions.version,
				databaseOptions.displayName,
				databaseOptions.maxSize
		);		
		
		var userTable = [
			{column:'name',dtype:'TEXT'},
			{column:'username',dtype:'TEXT'},
			{column:'password',dtype:'TEXT'},
			{column:'createdBy_id',dtype:'INTEGER'},
			{column:'createdDate',dtype:'TEXT'},
			{column:'updatedBy_id',dtype:'INTEGER'},
			{column:'updatedDate',dtype:'TEXT'}
		];
		
		var projectTable = [
			{column:'name',dtype:'TEXT'},
			{column:'description',dtype:'TEXT'},
			{column:'createdBy_id',dtype:'INTEGER'},
			{column:'createdDate',dtype:'TEXT'},
			{column:'updatedBy_id',dtype:'INTEGER'},
			{column:'updatedDate',dtype:'TEXT'}
		];
		
		var taskTable = [
			{column:'name',dtype:'TEXT'},
			{column:'description',dtype:'TEXT'},
			{column:'state',dtype:'TEXT'},
			{column:'startDate',dtype:'TEXT'},
			{column:'endDate',dtype:'TEXT'},
			{column:'assignee_id',dtype:'INTEGER'},
			{column:'project_id',dtype:'INTEGER'},
			{column:'createdBy_id',dtype:'INTEGER'},
			{column:'createdDate',dtype:'TEXT'},
			{column:'updatedBy_id',dtype:'INTEGER'},
			{column:'updatedDate',dtype:'TEXT'}
		];
		var projectUserTable = [
			{column:'user_id',dtype:'INTEGER'},
			{column:'project_id',dtype:'INTEGER'}
		];
		
		//register SQLiteDao
		brite.registerDao("User",new brite.dao.SQLiteDao("user","id",userTable));
		brite.registerDao("Project",new brite.dao.SQLiteDao("project","id",projectTable));
		brite.registerDao("Task",new brite.dao.SQLiteDao("task","id",taskTable));
		
		//many to many
		brite.registerDao("ProjectUser",new brite.dao.SQLiteDao("project_user","id",projectUserTable));
	}else{
		//register RemoteDao
		brite.registerDao("Project", new brite.dao.RemoteDao("Project"));
		brite.registerDao("User", new brite.dao.RemoteDao("User"));
		brite.registerDao("Task", new brite.dao.RemoteDao("Task"));
	}

})();

