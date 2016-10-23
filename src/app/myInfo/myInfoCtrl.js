"use strict";

angular.module('app')
    .controller('myInfoCtrl',['$http','$scope','$uibModal',function($http,$scope,$uibModal){
        var ctrl=this;

        ctrl.myModal={
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            controller: 'ModalInstanceCtrl',
            controllerAs: 'ctrl'
        };
        ctrl.doEdit=function(){
            ctrl.myModal.templateUrl="app/systemUser/editSystemUser.html";
            ctrl.myModal.resolve={result:function(){
                var result={};
                result.type="doEdit";
                result.data=$scope.systemUser;
                return result;
            }};

            var modalInstance = $uibModal.open(ctrl.myModal);
            modalInstance.result.then(function (selectedItem) {
            }, function () {
            });
        };

        ctrl.closeAlert = function(index) {
            ctrl.messages.splice(index, 1);
        };

        ctrl.date=new Date();
        ctrl.day=ctrl.date.getFullYear()+'-'+(ctrl.date.getMonth()+1)+'-'+ctrl.date.getDate();

        $http({
            url:'data/myInfo/messages.json',
            method:'get'
        }).then(function(response){
            ctrl.messages=response.data;
        });

}]).controller('ModalInstanceCtrl', function ($uibModalInstance,result) {
        var ctrl = this;
        ctrl.user=result.data;

        ctrl.ok = function () {
            $uibModalInstance.close(ctrl);
        };

        ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
