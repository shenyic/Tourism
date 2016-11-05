"use strict";

angular.module('app')
    .directive('header',function($cookies,$http){
        return {
            restrict:'AE',
            templateUrl:'common/directive/header/header.html',
            replace:true,
            link:function(scope){
                scope.loginOut=function(){
                    $cookies.remove("user");
                    window.location.href="login.html";
                };
                $http({
                    url:'data/myInfo/messages.json',
                    method:'get'
                }).then(function(response){
                    scope.messages=response.data;
                });
            }
        }
    });


