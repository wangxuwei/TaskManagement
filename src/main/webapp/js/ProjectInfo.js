(function($){

	function ProjectInfo(){};
  
	// --------- Component Interface Implementation ---------- //
	ProjectInfo.prototype.create = function(data,config){
		var c = this;
		var dfd = $.Deferred();
		brite.dao.get("Project",data.projectId).done(function(project){
			c.project = project;
			var html = $("#tmpl-ProjectInfo").render(project);
			dfd.resolve($(html));
		});
		return dfd.promise();
	}
	
	ProjectInfo.prototype.init = function(data,config){
		var c = this;
		var $e = this.$element;
		
	}
		
	ProjectInfo.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = this.$element;
		var mainScreen = $e.bComponent("MainScreen");
		mainScreen.$element.on("ProjectInfo_PROJECT_REFRESH",function(e,extra){
			var project = extra.project;
			$e.find(".ProjectInfo-top .title").html(project.name);
		});
		
		$e.on("click",".field[data-property='description']",function(){
			var $field = $(this);
			var $fieldValue = $field.find(".field-value");
			var description = c.project.description && c.project.description != null ? c.project.description : "";
			var $input = $("<textarea  name='projectDescription'>"+description+"</textarea>");
			$input.appendTo($fieldValue.empty());
			$input.focus();
		});
		
		$e.on("blur","textarea[name='projectDescription']",function(){
			var projectDescription = $(this).val();
			var $fieldValue = $(this).closest(".field-value");
			brite.dao.update("Project",c.project.id,{description:projectDescription}).done(function(project){
				c.project = project;
				$fieldValue.html(c.project.description);
			});
		});
	}
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Public API --------- //	
	
	// --------- /Component Public API --------- //
	
	// --------- Component Private API --------- //
	// --------- /Component Private API --------- //	
	
	
	// --------- Component Registration --------- //
	brite.registerComponent("ProjectInfo",{
        parent: ".rightPanel",
        emptyParent: true,
        loadTmpl:true
    },function(){
        return new ProjectInfo();
    });
	// --------- /Component Registration --------- //
})(jQuery);
