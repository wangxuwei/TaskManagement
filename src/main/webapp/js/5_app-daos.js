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
			{column:'id',dtype:'INTEGER'},
			{column:'name',dtype:'TEXT'},
			{column:'username',dtype:'TEXT'},
			{column:'password',dtype:'TEXT'},
			{column:'createdby_id',dtype:'INTEGER'},
			{column:'created_date',dtype:'TEXT'},
			{column:'updatedby_id',dtype:'INTEGER'},
			{column:'updated_date',dtype:'TEXT'}
		];
		
		var projectTable = [
			{column:'id',dtype:'INTEGER'},
			{column:'name',dtype:'TEXT'},
			{column:'description',dtype:'TEXT'},
			{column:'createdby_id',dtype:'INTEGER'},
			{column:'created_date',dtype:'TEXT'},
			{column:'updatedby_id',dtype:'INTEGER'},
			{column:'updated_date',dtype:'TEXT'}
		];
		
		var taskTable = [
			{column:'id',dtype:'INTEGER'},
			{column:'name',dtype:'TEXT'},
			{column:'description',dtype:'TEXT'},
			{column:'state',dtype:'TEXT'},
			{column:'start_date',dtype:'TEXT'},
			{column:'end_date',dtype:'TEXT'},
			{column:'assignee_id',dtype:'INTEGER'},
			{column:'project_id',dtype:'INTEGER'},
			{column:'createdby_id',dtype:'INTEGER'},
			{column:'created_date',dtype:'TEXT'},
			{column:'updatedby_id',dtype:'INTEGER'},
			{column:'updated_date',dtype:'TEXT'}
		];
		var projectUserTable = [
			{column:'id',dtype:'INTEGER'},
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
		brite.registerDao("Project", new app.RemoteDao("Project"));
		brite.registerDao("User", new app.RemoteDao("User"));
		brite.registerDao("Task", new app.RemoteDao("Task"));
	}

})();

