"use strict";

angular.module('app')
    .controller('analysisCtrl',function(){
        var ctrl=this;

        ctrl.numPages=10;
        ctrl.currentPage=1;

        ctrl.selectPage=function(page){
            alert(page);
        }

});
