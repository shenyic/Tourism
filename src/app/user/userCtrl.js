"use strict";

angular.module('app')
	.controller('userCtrl', ['$http', '$uibModal', function ($http, $uibModal) {
		var ctrl = this;

		ctrl.checked=false;

		$http({
			url:'data/user/user.json',
			method:'get'
		}).then(function(response){
			ctrl.data=response.data.users;
			ctrl.currentPage=1;
			ctrl.pageSize=response.data.pageSize;
			ctrl.numPages=response.data.numPages;
			ctrl.users=ctrl.data.slice(0,ctrl.pageSize);
		});

		ctrl.selectPage=function(page){
			ctrl.users=ctrl.data.slice((page-1)*ctrl.pageSize,(page-1)*ctrl.pageSize+ctrl.pageSize);
		};

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

		ctrl.doEdit = function (user) {
			ctrl.myModal.templateUrl="app/user/editUser.html";
			ctrl.myModal.resolve={result:function(){
				var result={};
				result.type="doEdit";
				result.data=user;
				return result;
			}};
			$uibModal.open(ctrl.myModal);
		};

		ctrl.doPush=function(){
			ctrl.myModal.templateUrl="app/user/pushToUser.html";
			ctrl.myModal.resolve={result:function(){
				var result={};
				return result;
			}};
			$uibModal.open(ctrl.myModal);
		};

		ctrl.doDelete = function () {
			var noCheckedUsers=[];
			angular.forEach(ctrl.users,function(user){
				if(!user.checked){
					noCheckedUsers.push(user);
				}
			});
			if(noCheckedUsers.length==ctrl.users.length)return;
			ctrl.myModal.templateUrl="app/user/deleteUser.html";
			ctrl.myModal.resolve={result:function(){
				var result={};
				result.type="doDelete";
				result.data=noCheckedUsers;
				return result;
			}};
			var modalInstance = $uibModal.open(ctrl.myModal);
			modalInstance.result.then(function (response) {
				ctrl.users=response.noCheckedUsers;
			}, function () {
			});
		};

	}]).controller('systemUserModalCtrl', function ($uibModalInstance,result) {
		var ctrl = this;
		if(result.type=="doEdit"){
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
