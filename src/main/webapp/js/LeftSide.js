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
		
		var $projectContainer = $e.find(".projectsContainer");
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
		
		
		$e.on("click",".projectsContainer .project",function(){
			brite.display("TasksList");
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
