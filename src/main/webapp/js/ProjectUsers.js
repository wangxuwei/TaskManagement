(function($){

	function ProjectUsers(){};
  
	// --------- Component Interface Implementation ---------- //
	ProjectUsers.prototype.create = function(data,config){
		var html = $("#tmpl-ProjectUsers").html();
		return $(html);
	}
	
	ProjectUsers.prototype.init = function(data,config){
		var c = this;
		var $e = this.$element;
		
	}
		
	ProjectUsers.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = this.$element;
		app.util.alignCenter($e);
	}
	
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Public API --------- //	
	ProjectUsers.prototype.close = function(){
		var c = this;
		var $e = this.$element;
		
		$e.bRemove();
	}
	// --------- /Component Public API --------- //
	
	// --------- Component Private API --------- //
	// --------- /Component Private API --------- //	
	
	
	// --------- Component Registration --------- //
	brite.registerComponent("ProjectUsers",{
        parent: "#page",
        loadTmpl:true
    },function(){
        return new ProjectUsers();
    });
	// --------- /Component Registration --------- //
})(jQuery);
