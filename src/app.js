"use strict";

angular.module('app',['ui.bootstrap','ui.router','oc.lazyLoad','ngCookies'])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

        var baseUrl='app';
        $urlRouterProvider.otherwise('analysis');
        var Module=['analysis','systemUser','scenicSpot'];
        for(var i=0;i<Module.length;i++){
            $stateProvider.state({
                name: Module[i],
                url: '/'+Module[i],
                controller:Module[i]+'Ctrl as ctrl',
                templateUrl:baseUrl+'/'+Module[i]+'/'+Module[i]+'.html',
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        var ctrl=this.templateUrl.split('.')[0]+'Ctrl.js';
                        return $ocLazyLoad.load(ctrl);
                    }]
                }
            });
        }
}]).controller("mainCtrl",function($scope,$http,$location,$cookies){
        var ctrl=this;

        $scope.$watch(function() {
            return $location.path();
        },function(newValue){
            ctrl.path=newValue;
        });

        ctrl.changeSize=function($event){
            if($($event.target).hasClass('closed')){
                $('.navbar-side').animate({left: '0px'});
                $($event.target).removeClass('closed');
                $('#page-wrapper').animate({'margin-left' : '260px'});
            }
            else{
                $($event.target).addClass('closed');
                $('.navbar-side').animate({left: '-260px'});
                $('#page-wrapper').animate({'margin-left' : '0px'});
            }
        };

        ctrl.loginOut=function(){
            $cookies.remove("user");
            window.location.href="login.html";
        };

        $http({
            url:'data/sidebar/sidebar.json',
            method:'get'
        }).then(function(response){
            ctrl.list=response.data;
        });
    });
