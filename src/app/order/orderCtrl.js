"use strict";

angular.module('app')
	.controller('orderCtrl', ['$http', '$uibModal', function ($http, $uibModal) {
		var ctrl = this;

		ctrl.checked=false;

		$http({
			url: 'data/order/order.json',
			method: 'get'
		}).then(function (response) {
			ctrl.orders = response.data;
			$http({
				url: 'data/user/user.json',
				method: 'get'
			}).then(function (response) {
				ctrl.users = response.data.users;
				angular.forEach(ctrl.orders,function(order){
					var total=0;
					angular.forEach(order.detail.ticket,function(ticket){
						total=total+ticket.price*ticket.count;
					});
					order.total=total;
					angular.forEach(ctrl.users,function(user){
						if(order.userId==user.id){
							order.user=user;
						}
					});
				});
			});
		});

		ctrl.onCheck=function(){
			if(ctrl.checked){
				angular.forEach(ctrl.orders,function(order){
					order.checked=true;
				});
			}else{
				angular.forEach(ctrl.orders,function(order){
					order.checked=false;
				})

			}
		};

		ctrl.toggleSelected=function(item){
			item.selected=!item.selected;
		};

		ctrl.isSelected=function(){
			return $scope.selected;
		};

		ctrl.myModal={
			animation: true,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			controller: 'orderModalCtrl',
			controllerAs: 'ctrl'
		};


		ctrl.doEdit = function (order) {
			ctrl.myModal.templateUrl="app/order/editOrder.html";
			ctrl.myModal.resolve={result:function(){
				var result={};
				result.type="doEdit";
				result.data=order;
				return result;
			}};

			var modalInstance = $uibModal.open(ctrl.myModal);
			modalInstance.result.then(function (selectedItem) {
			}, function () {
			});
		};


		ctrl.doDelete = function () {
			var noCheckedOrders=[];
			angular.forEach(ctrl.orders,function(order){
				if(!order.checked){
					noCheckedOrders.push(order);
				}
			});
			if(noCheckedOrders.length==ctrl.orders.length)return;
			ctrl.myModal.templateUrl="app/order/deleteOrder.html";
			ctrl.myModal.resolve={result:function(){
				var result={};
				result.type="doDelete";
				result.data=noCheckedOrders;
				return result;
			}};
			var modalInstance = $uibModal.open(ctrl.myModal);
			modalInstance.result.then(function (response) {
				ctrl.orders=response.noCheckedOrders;
			}, function () {
			});
		};

	}]).controller('orderModalCtrl', function ($uibModalInstance,result) {
		var ctrl = this;
		if(result.type=="doEdit"){
			ctrl.order=result.data;
		}else if(result.type=="doDelete"){
			ctrl.noCheckedOrders=result.data;
		}

		ctrl.ok = function () {
			$uibModalInstance.close(ctrl);
		};

		ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	});
