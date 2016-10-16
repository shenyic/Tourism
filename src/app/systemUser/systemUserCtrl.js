"use strict";

angular.module('app')
	.controller('systemUserCtrl', ['$http', '$uibModal', function ($http, $uibModal) {
		var ctrl = this;

		ctrl.checked=false;

		$http({
			url: 'data/systemUser/systemUser.json',
			method: 'get'
		}).then(function (response) {
			ctrl.systemUsers = response.data;
		});

		ctrl.onCheck=function(){
			if(ctrl.checked){
				angular.forEach(ctrl.systemUsers,function(user){
					user.checked=true;
				});
			}else{
				angular.forEach(ctrl.systemUsers,function(user){
					user.checked=false;
				})

			}
		};

		ctrl.myModal={
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: "app/systemUser/addSystemUser.html",
			controller: 'ModalInstanceCtrl',
			controllerAs: 'ctrl',
			resolve: {
				result: function () {
					return $http({
						url: 'data/systemUser/power.json',
						method: 'get'
					});
				}
			}
		};


		ctrl.doAdd = function () {
			ctrl.myModal.templateUrl="app/systemUser/addSystemUser.html";
			var modalInstance = $uibModal.open(ctrl.myModal);

			modalInstance.result.then(function (selectedItem) {
			}, function () {
			});

		};

		ctrl.doEdit = function () {
			ctrl.myModal.templateUrl="app/systemUser/editSystemUser.html";
			var modalInstance = $uibModal.open(ctrl.myModal);
			modalInstance.result.then(function (selectedItem) {
			}, function () {
			});
		};

		ctrl.doGive = function () {
			ctrl.myModal.templateUrl="app/systemUser/giveSystemUser.html";
			ctrl.myModal.seze='sm';
			var modalInstance = $uibModal.open(ctrl.myModal);
			modalInstance.result.then(function (selectedItem) {
			}, function () {

			});
		};

		ctrl.doDelete = function () {
			ctrl.myModal.templateUrl="app/systemUser/deleteSystemUser.html";
			var modalInstance = $uibModal.open(ctrl.myModal);
			modalInstance.result.then(function (selectedItem) {
			}, function () {
			});
		};

	}]).controller('ModalInstanceCtrl', function ($uibModalInstance,result) {
		var ctrl = this;
		ctrl.power=result.data;

		ctrl.ok = function () {
			$uibModalInstance.close();
		};

		ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	});
