(function($){

	function TasksList(){};
  
	// --------- Component Interface Implementation ---------- //
	TasksList.prototype.create = function(data,config){
		var c = this;
		var dfd = $.Deferred();
		brite.dao.get("Project",data.projectId).done(function(project){
			c.project = project;
			var html = $("#tmpl-TasksList").render(project);
			dfd.resolve($(html));
		});
		return dfd.promise();
	}
	
	TasksList.prototype.init = function(data,config){
		var c = this;
		var $e = this.$element;
		
		refreshTasks.call(c);
	}
		
	TasksList.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = this.$element;
		var mainScreen = $e.bComponent("MainScreen");
		var $projectTitle = $e.find(".projectTitle");
		
		mainScreen.$element.on("TasksList_TASK_REFRESH",function(e,extra){
			var task = extra.task;
			$e.find(".task[data-obj_id='"+task.id+"']").html(task.name);
		});
		
		$e.on("click",".btnEdit",function(){
			var $input = $("<input type='text' name='projectName' value='"+c.project.name+"' />");
			$input.appendTo($projectTitle.empty());
			$input.focus();
		});
		
		$projectTitle.on("blur","input",function(){
			var projectName = $(this).val();
			brite.dao.update("Project",c.project.id,{name:projectName}).done(function(project){
				c.project = project;
				$projectTitle.html(c.project.name);
				mainScreen.$element.trigger("MainScreen_PROJECT_REFRESH",{project:c.project});
			});
		});
		
		$e.on("click",".btnDelete",function(){
			brite.dao.remove("Project",c.project.id).done(function(){
				brite.display("MainScreen");
			});
		});
		
		
		$e.on("click",".btnCreateTask",function(){
			var task = {
				name:"New Task",
				state:"New",
				createdDate:new Date(),
				project_id:c.project.id,
				createdBy_id:1
			}
			brite.dao.create("Task",task).done(function(newTask){
				brite.display("TaskInfo",{taskId:newTask.id});
				refreshTasks.call(c);
			});
		});
		
		$e.on("click",".tasksContainer .task",function(){
			var taskObj = $(this).bObjRef();
			brite.display("TaskInfo",{taskId:taskObj.id});
		});
		
	}
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Public API --------- //	
	
	// --------- /Component Public API --------- //
	
	// --------- Component Private API --------- //
	function refreshTasks(){
		var c = this;
		var $e = this.$element;
		
		var $taskContainer = $e.find(".tasksContainer").empty();
		brite.dao.list("Task",{match:{project_id:c.project.id}}).done(function(tasks){
			for(var i=0 ; i < tasks.length; i++){
				var task = tasks[i];
				$taskContainer.append($($("#tmpl-TasksList-taskItem").render(task)));
			}
		});
	}
	// --------- /Component Private API --------- //	
	
	
	// --------- Component Registration --------- //
	brite.registerComponent("TasksList",{
        parent: ".centerPanel",
        emptyParent: true,
        loadTmpl:true
    },function(){
        return new TasksList();
    });
	// --------- /Component Registration --------- //
})(jQuery);
