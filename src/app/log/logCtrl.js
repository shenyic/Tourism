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
			controller: 'systemUserModalCtrl',
			controllerAs: 'ctrl'
		};


		ctrl.doAdd = function () {
			ctrl.myModal.templateUrl="app/systemUser/addSystemUser.html";
			ctrl.myModal.resolve={result:function(){
				var result={};
				result.type="doAdd";
				return result;
			}};
			var modalInstance = $uibModal.open(ctrl.myModal);

			modalInstance.result.then(function (selectedItem) {
			}, function () {
			});
		};

		ctrl.doEdit = function (user) {
			ctrl.myModal.templateUrl="app/systemUser/editSystemUser.html";
			ctrl.myModal.resolve={result:function(){
				var result={};
				result.type="doEdit";
				result.data=user;
				return result;
			}};

			var modalInstance = $uibModal.open(ctrl.myModal);
			modalInstance.result.then(function (selectedItem) {
			}, function () {
			});
		};

		ctrl.doGive = function () {
			ctrl.myModal.templateUrl="app/systemUser/giveSystemUser.html";
			ctrl.myModal.seze='sm';
			ctrl.myModal.resolve={result:function(){
				return $http({
					url: 'data/systemUser/power.json',
					method: 'get'
				});
			}};
			var modalInstance = $uibModal.open(ctrl.myModal);
			modalInstance.result.then(function (response) {

			}, function () {

			});
		};

		ctrl.doDelete = function () {
			var noCheckedUsers=[];
			angular.forEach(ctrl.systemUsers,function(user){
				if(!user.checked){
					noCheckedUsers.push(user);
				}
			});
			if(noCheckedUsers.length==ctrl.systemUsers.length)return;
			ctrl.myModal.templateUrl="app/systemUser/deleteSystemUser.html";
			ctrl.myModal.resolve={result:function(){
				var result={};
				result.type="doDelete";
				result.data=noCheckedUsers;
				return result;
			}};
			var modalInstance = $uibModal.open(ctrl.myModal);
			modalInstance.result.then(function (response) {
				ctrl.systemUsers=response.noCheckedUsers;
			}, function () {
			});
		};

	}]).controller('systemUserModalCtrl', function ($uibModalInstance,result) {
		var ctrl = this;
		if(angular.isUndefined(result.type)){
			ctrl.power=result.data;
		}else if(result.type=="doEdit"){
			ctrl.user=result.data;
		}else if(result.type=="doDelete"){
			ctrl.noCheckedUsers=result.data;
		}


		ctrl.ok = function () {
			$uibModalInstance.close(ctrl);
		};

		ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	});
