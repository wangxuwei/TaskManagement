(function($){

	function TaskInfo(){};
  
	// --------- Component Interface Implementation ---------- //
	TaskInfo.prototype.create = function(data,config){
		var html = $("#tmpl-TaskInfo").html();
		return $(html);
	}
	
	TaskInfo.prototype.init = function(data,config){
		var c = this;
		var $e = this.$element;
		
	}
		
	TaskInfo.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = this.$element;
		
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
