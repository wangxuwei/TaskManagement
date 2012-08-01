(function($){

	function ProjectInfo(){};
  
	// --------- Component Interface Implementation ---------- //
	ProjectInfo.prototype.create = function(data,config){
		var html = $("#tmpl-ProjectInfo").html();
		return $(html);
	}
	
	ProjectInfo.prototype.init = function(data,config){
		var c = this;
		var $e = this.$element;
		
	}
		
	ProjectInfo.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = this.$element;
		
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
