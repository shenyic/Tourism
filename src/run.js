/**
 * Created by hp on 2016/10/22.
 */
"use strict";
angular.module('app').run(['$cookies','$window','$rootScope',function($cookies,$window,$rootScope){

	try {
		var user = JSON.parse($window.unescape($cookies.get("user")));
		if(angular.isUndefined(user)) {
			$window.location.href = "login.html";
		}else{
			$rootScope.systemUser=user;
		}
	}catch(e){
		$window.location.href="login.html";
	}

}]);