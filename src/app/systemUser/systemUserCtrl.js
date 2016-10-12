"use strict";

angular.module('app')
    .controller('systemUserCtrl',['$http',function($http,$parseInt){
        var ctrl=this;

        ctrl.selectPage=function(page){
            ctrl.users=ctrl.data.slice((page-1)*ctrl.pageSize,(page-1)*ctrl.pageSize+ctrl.pageSize);
        };

}]);
