(function($){

	function TaskInfo(){};
  
	// --------- Component Interface Implementation ---------- //
	TaskInfo.prototype.create = function(data,config){
		var c = this;
		var dfd = $.Deferred();
		brite.dao.get("Task",data.taskId).done(function(task){
			c.task = task;
			var html = $("#tmpl-TaskInfo").render(task);
			dfd.resolve($(html));
		});
		return dfd.promise();
	}
	
	TaskInfo.prototype.init = function(data,config){
		var c = this;
		var $e = this.$element;
		
	}
		
	TaskInfo.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = this.$element;
		var mainScreen = $e.bComponent("MainScreen");
		
		var $taskTitle = $e.find(".TaskInfo-top .title");
		$e.on("click",".btnEdit",function(){
			var $input = $("<input type='text' name='taskName' value='"+c.task.name+"' />");
			$input.appendTo($taskTitle.empty());
			$input.focus();
		});
		
		$taskTitle.on("blur","input",function(){
			var taskName = $(this).val();
			brite.dao.update("Task",c.task.id,{name:taskName}).done(function(task){
				c.task = task;
				$taskTitle.html(c.task.name);
				mainScreen.$element.trigger("TasksList_TASK_REFRESH",{task:c.task});
			});
		});
		
		$e.on("click",".btnDelete",function(){
			var projectId = c.task.project_id;
			brite.dao.remove("Task",c.task.id).done(function(){
				brite.display("ProjectInfo",{projectId:projectId});
				brite.display("TasksList",{projectId:projectId});
			});
		});
		
		$e.on("click",".field[data-property='description']",function(){
			var $field = $(this);
			var $fieldValue = $field.find(".field-value");
			var description = c.task.description && c.task.description != null ? c.task.description : "";
			var $input = $("<textarea  name='taskDescription'>"+description+"</textarea>");
			$input.appendTo($fieldValue.empty());
			$input.focus();
		});
		
		$e.on("blur","textarea[name='taskDescription']",function(){
			var taskDescription = $(this).val();
			var $fieldValue = $(this).closest(".field-value");
			brite.dao.update("Task",c.task.id,{description:taskDescription}).done(function(task){
				c.task = task;
				$fieldValue.html(c.task.description);
			});
		});
		
		$e.on("click",".field[data-property='assignee_id']",function(){
			var $field = $(this);
			var $fieldValue = $field.find(".field-value");
			var assignee_id = c.task.assignee_id && c.task.description != null ? c.task.description : "";
			var $input = $("<select  name='taskAssignee_id'></select>");
			$input.appendTo($fieldValue.empty());
			$input.append($($("#tmpl-TaskInfo-assigneeItem").render({id:"",username:"select a assignee"})));
			brite.dao.get("Project",c.task.project_id).done(function(project){
				var users = project.userSet;
				for(var i=0 ; i < users.length; i++){
					var user = users[i];
					$input.append($($("#tmpl-TaskInfo-assigneeItem").render(user)));
				}
				$input.val(c.task.assignee_id);
			});
		});
		
		$e.on("change","select[name='taskAssignee_id']",function(){
			var taskAssignee_id = $(this).val();
			var $fieldValue = $(this).closest(".field-value");
			brite.dao.update("Task",c.task.id,{assignee_id:taskAssignee_id}).done(function(task){
				c.task = task;
				$fieldValue.html(c.task.assignee_id);
			});
		});
		
	}
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Public API --------- //	
	
	// --------- /Component Public API --------- //
	
	// --------- Component Private API --------- //
	// --------- /Component Private API --------- //	
	
	
	// --------- Component Registration --------- //
	brite.registerComponent("TaskInfo",{
        parent: ".rightPanel",
        emptyParent: true,
        loadTmpl:true
    },function(){
        return new TaskInfo();
    });
	// --------- /Component Registration --------- //
})(jQuery);
