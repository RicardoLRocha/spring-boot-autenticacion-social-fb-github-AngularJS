
angular
	.module("app", [])
	.config(
			function($httpProvider) {
				$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
			}).controller("home", function($http, $location) {
		
		var self = this;

		/** regreso a vista la propiedad del nombre de usuario 
			@RequestMapping({ "/user", "/me" })

			return map.put("name", principal.getName());
		*/
		$http.get("/user").success(function(data) {
			if (data.name) {
				self.user = data.name;
				self.authenticated = true;
			} else {
				self.user = "N/A";
				self.authenticated = false;
			}
		}).error(function() {
			self.user = "N/A";
			self.authenticated = false;
		});
		
		self.logout = function() {
			$http.post('logout', {}).success(function() {
				self.authenticated = false;
				$location.path("/");
			}).error(function(data) {
				console.log("Logout failed")
				self.authenticated = false;
			});
		};

	});