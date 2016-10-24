"use strict";

angular.module('app',['ui.bootstrap','ui.router','oc.lazyLoad','ngCookies'])
    .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function($stateProvider,$urlRouterProvider,$ocLazyLoadProvider){

        var baseUrl='app';
        $urlRouterProvider.otherwise('myInfo');
        var Module=['analysis','systemUser','scenicSpot','myInfo'];
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
}]);
