"use strict";

angular.module('app',['ui.router'])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

        var baseUrl='app';

        $urlRouterProvider.otherwise('analysis');

        $stateProvider.state({
            name: 'analysis',
            url: '/analysis',
            templateUrl:baseUrl+'/analysis/analysis.html'
        });


}]);
