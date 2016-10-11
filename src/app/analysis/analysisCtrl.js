"use strict";

angular.module('app')
    .controller('analysisCtrl',['$http',function($http){
        var ctrl=this;

        ctrl.pageSize=10;

        ctrl.numPages=10;
        ctrl.currentPage=1;

        $http({
            url:'data/500.json',
            method:'get'
        }).then(function(response){
            ctrl.data=response.data;
            ctrl.users=ctrl.data.slice(0,ctrl.pageSize);
        });


        ctrl.selectPage=function(page){
            ctrl.users=ctrl.data.slice((page-1)*ctrl.pageSize,(page-1)*ctrl.pageSize+ctrl.pageSize);
        }

}]);
