(function($){

	function LeftSide(){};
  
	// --------- Component Interface Implementation ---------- //
	LeftSide.prototype.create = function(data,config){
		var html = $("#tmpl-LeftSide").html();
		return $(html);
	}
	
	LeftSide.prototype.init = function(data,config){
		var c = this;
		var $e = this.$element;
		
		var $projectContainer = $e.find(".projectsContainer").empty();
		brite.dao.list("Project",{}).done(function(projects){
			for(var i=0 ; i < projects.length; i++){
				var project = projects[i];
				$projectContainer.append($($("#tmpl-LeftSide-projectItem").render(project)));
			}
		});
	}
		
	LeftSide.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = this.$element;
		var mainScreen = $e.bComponent("MainScreen");
		
		mainScreen.$element.on("LeftSide_PROJECT_REFRESH",function(e,extra){
			var project = extra.project;
			$e.find(".project[data-obj_id='"+project.id+"']").html(project.name);
		});
		
		$e.on("click",".btnCreateProject",function(){
			var project = {
				name:"New project",
				createdDate:new Date(),
				createdBy_id:1
			}
			brite.dao.create("Project",project).done(function(newProject){
				brite.display("TasksList",{projectId:newProject.id});
				brite.display("ProjectInfo",{projectId:newProject.id});
				brite.display("LeftSide");
			});
		});
		
		$e.on("click",".projectsContainer .project",function(){
			var projectObj = $(this).bObjRef();
			brite.display("TasksList",{projectId:projectObj.id});
			brite.display("ProjectInfo",{projectId:projectObj.id});
		});
		
	}
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Public API --------- //	
	
	// --------- /Component Public API --------- //
	
	// --------- Component Private API --------- //
	// --------- /Component Private API --------- //	
	
	
	// --------- Component Registration --------- //
	brite.registerComponent("LeftSide",{
        parent: ".leftPanel",
        emptyParent: true,
        loadTmpl:true
    },function(){
        return new LeftSide();
    });
	// --------- /Component Registration --------- //
})(jQuery);
