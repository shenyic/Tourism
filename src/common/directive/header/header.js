"use strict";

angular.module('app')
    .directive('header',function($cookies){
        return {
            restrict:'AE',
            templateUrl:'common/directive/header/header.html',
            replace:true,
            link:function(scope){
                scope.loginOut=function(){
                    $cookies.remove("user");
                    window.location.href="login.html";
                };
            }
        }
    });


