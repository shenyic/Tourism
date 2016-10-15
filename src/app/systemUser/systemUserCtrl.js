"use strict";

angular.module('app')
	.controller('systemUserCtrl', ['$http', '$uibModal', function ($http, $uibModal) {
		var ctrl = this;

		ctrl.doAdd = function () {
			var modalInstance = $uibModal.open({
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
			});

			modalInstance.result.then(function (selectedItem) {
			}, function () {
			});

		};

		ctrl.doEdit = function () {
			var modalInstance = $uibModal.open({
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
			});

			modalInstance.result.then(function (selectedItem) {
			}, function () {
			});
		};

		ctrl.doGive = function () {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: "app/systemUser/giveSystemUser.html",
				controller: 'ModalInstanceCtrl',
				controllerAs: 'ctrl',
				size:'sm',
				resolve: {
					result: function () {
						return $http({
							url: 'data/systemUser/power.json',
							method: 'get'
						});
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
			}, function () {

			});
		};

		ctrl.doDelete = function () {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: "app/systemUser/deleteSystemUser.html",
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
			});

			modalInstance.result.then(function (selectedItem) {
			}, function () {
			});
		};

		$http({
			url: 'data/systemUser/systemUser.json',
			method: 'get'
		}).then(function (response) {
			ctrl.systemUsers = response.data;
		});




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
