(function($){

	function TasksList(){};
  
	// --------- Component Interface Implementation ---------- //
	TasksList.prototype.create = function(data,config){
		var html = $("#tmpl-TasksList").html();
		return $(html);
	}
	
	TasksList.prototype.init = function(data,config){
		var c = this;
		var $e = this.$element;
		
		var $taskContainer = $e.find(".tasksContainer");
		brite.dao.list("Task",{}).done(function(tasks){
			for(var i=0 ; i < tasks.length; i++){
				var task = tasks[i];
				$taskContainer.append($($("#tmpl-TasksList-taskItem").render(task)));
			}
		});
	}
		
	TasksList.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = this.$element;
		
	}
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Public API --------- //	
	
	// --------- /Component Public API --------- //
	
	// --------- Component Private API --------- //
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
