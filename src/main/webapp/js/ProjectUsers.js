(function($){

	function ProjectUsers(){};
  
	// --------- Component Interface Implementation ---------- //
	ProjectUsers.prototype.create = function(data,config){
		var c = this;
		var dfd = $.Deferred();
		brite.dao.get("Project",data.projectId).done(function(project){
			c.project = project;
			var html = $("#tmpl-ProjectUsers").render(project);
			dfd.resolve($(html));
		});
		return dfd.promise();
	}
	
	ProjectUsers.prototype.init = function(data,config){
		var c = this;
		var $e = this.$element;
		refreshUsers.call(c);
		
		refreshNotInUsers.call(c);
	}
		
	ProjectUsers.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = this.$element;
		app.util.alignCenter($e);
		
		$e.on("click",".close",function(){
			c.close();
		});
		
		
		$e.on("click",".btnAdd",function(){
			var userId = $e.find("select[name='username']").val();
			brite.dao.invoke("addUser","Project",{userId:userId,projectId:c.project.id}).done(function(){
				refreshUsers.call(c);
				refreshNotInUsers.call(c);
			});
		});
		
		$e.on("click",".remove",function(){
			var userId = $(this).bObjRef().id;
			brite.dao.invoke("removeUser","Project",{userId:userId,projectId:c.project.id}).done(function(){
				refreshUsers.call(c);
				refreshNotInUsers.call(c);
			});
		});
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
	function refreshUsers(){
		var c = this;
		var $e = this.$element;
		
		var $userContainer = $e.find(".usersContainer").empty();
		brite.dao.get("Project",c.project.id).done(function(project){
			var users = project.userSet;
			for(var i=0 ; i < users.length; i++){
				var user = users[i];
				$userContainer.append($($("#tmpl-ProjectUsers-userItem").render(user)));
			}
		});
	}
	
	function refreshNotInUsers(){
		var c = this;
		var $e = this.$element;
		
		var $userContainer = $e.find("select[name='username']").empty();
		brite.dao.invoke("getUsersNotInProject","Project",{projectId:c.project.id}).done(function(users){
			for(var i=0 ; i < users.length; i++){
				var user = users[i];
				$userContainer.append($($("#tmpl-ProjectUsers-userOptionItem").render(user)));
			}
		});
	}
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
