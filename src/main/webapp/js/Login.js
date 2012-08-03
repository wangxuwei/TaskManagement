(function($) {
	
	// --------- Component Interface Implementation --------- //
	function Login(){}
	
	
	Login.prototype.create = function(data,config){
		var html = $("#tmpl-Login").html();
		var $e = $(html);
		return $e;
	}
	
	Login.prototype.postDisplay = function(data,config){
		var c = this;
		var $e = c.$element;
		
		app.util.alignCenter($e);
		
		$e.find("input[name='username']").focus();
		
		$e.find(".action").on("click",function(){
			var username = $e.find("input[name='username']");
			var password = $e.find("input[name='password']");
			$e.find("*").removeClass("error");
			$e.find(".help-inline").empty();
			if(username.val() == "") {
				username.focus();
				username.closest("div").addClass("error").find("span").html("Please enter valid user name");
			}else if(password.val() == "") {
				password.focus();
				password.closest("div").addClass("error").find("span").html("Please enter valid password");
			}else if(password.val() != "heartsnow") {
				password.focus();
				password.closest("div").addClass("error").find("span").html("Password error");
			} else {
				var type = $(this).attr("data-type");
				if(type == "login"){
					login(username.val()).done(function(user){
						if (typeof user  == "object"){
							window.location = contextPath;
						}
					});
					
				}else if(type == "register"){
					register(username.val(),password.val()).done(function(user){
						if (typeof user  == "object"){
							$e.find("form").reset();
							alert("Success, you can use this user to login");
						}
					});
				}
			}
			return false;
		})
	}
	// --------- /Component Interface Implementation --------- //
	
	
	
	// --------- Helper Functions --------- //
	/**
	 * login to game app
	 */
	function login(username){
		var reqData = {
			action: "login",
			username: username
			
		}
		return $.ajax({
			type: "POST",
			url: jsonUrl,
			data: reqData,
			dataType: "json"
		}).pipe( function(val) {
			return val;
		});
	}
	
	function register(username,password){
		var reqData = {
			action: "register",
			username: username,
			password: password,
		}
		return $.ajax({
			type: "POST",
			url: jsonUrl,
			data: reqData,
			dataType: "json"
		}).pipe( function(val) {
			return val;
		});
	}
	// --------- /Helper Functions --------- //
	
	
	// --------- Component Registration --------- //
	brite.registerComponent("Login", {
		parent : "#page",
		loadTmpl : true
	}, function() {
		return new Login();
	});
	// --------- /Component Registration --------- //
	
	
})(jQuery);