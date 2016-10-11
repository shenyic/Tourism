"use strict";

angular.module('app',['ui.router','oc.lazyLoad'])
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
}]);
