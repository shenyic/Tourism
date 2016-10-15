"use strict";

angular.module('app',['ui.bootstrap','ui.router','oc.lazyLoad'])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

        var baseUrl='app';

        $urlRouterProvider.otherwise('analysis');

        $stateProvider.state({
            name: 'analysis',
            url: '/analysis',
            controller:'analysisCtrl as ctrl',
            templateUrl:baseUrl+'/analysis/analysis.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load(baseUrl+'/analysis/analysisCtrl.js');
                }]
            }
        });

        $stateProvider.state({
            name: 'systemUser',
            url: '/systemUser',
            controller:'systemUserCtrl as ctrl',
            templateUrl:baseUrl+'/systemUser/systemUser.html',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load(baseUrl+'/systemUser/systemUserCtrl.js');
                }]
            }
        });
}]).controller("mainCtrl",function($scope,$http,$location){
        var ctrl=this;

        $scope.$watch(function() {
            return $location.path();
        },function(newValue){
            ctrl.path=newValue;
        });

        $("#sideNav").click(function(){
            if($(this).hasClass('closed')){
                $('.navbar-side').animate({left: '0px'});
                $(this).removeClass('closed');
                $('#page-wrapper').animate({'margin-left' : '260px'});
            }
            else{
                $(this).addClass('closed');
                $('.navbar-side').animate({left: '-260px'});
                $('#page-wrapper').animate({'margin-left' : '0px'});
            }
        });


        $http({
            url:'data/sidebar/sidebar.json',
            method:'get'
        }).then(function(response){
            ctrl.list=response.data;
        });
    });
