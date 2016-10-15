"use strict";

angular.module('app')
    .controller('analysisCtrl',['$http','$scope','$timeout',function($http,$scope,$timeout){
        var ctrl=this;

        $http({
            url:'data/analysis/newUser.json',
            method:'get'
        }).then(function(response){
            ctrl.data=response.data.users;
            ctrl.currentPage=1;
            ctrl.pageSize=response.data.pageSize;
            ctrl.numPages=response.data.numPages;
            ctrl.users=ctrl.data.slice(0,ctrl.pageSize);
        });

        $http({
            url:'data/analysis/gainGraphic.json',
            method:'get'
        }).then(function(response){
            ctrl.gain=response.data;
            ctrl.bar=Morris.Bar({
                element: 'morris-bar-chart',
                data:ctrl.gain,
                xkey: 'y',
                ykeys: ['a', 'b'],
                labels: ['上月', '当月'],
                hideHover: 'auto',
                resize: true
            });
        });

        $http({
            url:'data/analysis/pageView.json',
            method:'get'
        }).then(function(response){
            ctrl.pageView=response.data;
            Morris.Donut({
                element: 'morris-donut-chart',
                data:ctrl.pageView,
                resize: true
            });
        });

        ctrl.selectPage=function(page){
            ctrl.users=ctrl.data.slice((page-1)*ctrl.pageSize,(page-1)*ctrl.pageSize+ctrl.pageSize);
        };


}]);
