"use strict";

angular.module('app')
    .controller('systemUserCtrl',['$http','$uibModal',function($http,$uibModal){
        var ctrl=this;

        ctrl.doAdd=function(){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                template:"<div style='height: 500px'></div>",
                //templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: '$ctrl',
                resolve: {
                    items: function () {
                        return null;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                //$ctrl.selected = selectedItem;
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });

        };

        ctrl.doEdit=function(){
            ctrl.doAdd();
        };

        ctrl.doGive=function(){
            ctrl.doAdd();
        };

        ctrl.doDelete=function(){
            ctrl.doAdd();
        };

        $http({
            url:'data/systemUser/systemUser.json',
            method:'get'
        }).then(function(response){
            ctrl.systemUsers=response.data;
        });



}]).controller('ModalInstanceCtrl', function ($uibModalInstance, items) {
        var $ctrl = this;

        /*$ctrl.selected = {
            item: $ctrl.items[0]
        };*/

        $ctrl.ok = function () {
            $uibModalInstance.close();
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
