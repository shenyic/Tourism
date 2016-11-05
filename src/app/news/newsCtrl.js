"use strict";

angular.module('app')
	.controller('newsCtrl', ['$scope','$http', '$uibModal', function ($scope,$http, $uibModal) {
		var ctrl = this;

		ctrl.checked=false;

		$http({
			url: 'data/news/news.json',
			method: 'get'
		}).then(function (response) {
			ctrl.news = response.data;
		});

		ctrl.onCheck=function(){
			if(ctrl.checked){
				angular.forEach(ctrl.news,function(item){
					item.checked=true;
				});
			}else{
				angular.forEach(ctrl.news,function(item){
					item.checked=false;
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
			size:"lg",
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			controller: 'newsModalCtrl',
			controllerAs: 'ctrl'
		};


		ctrl.doAdd = function () {
			ctrl.myModal.templateUrl="app/news/addNews.html";
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

		ctrl.doEdit = function (item) {
			ctrl.myModal.templateUrl="app/news/editNews.html";
			ctrl.myModal.resolve={result:function(){
				var result={};
				result.type="doEdit";
				result.data=item;
				return result;
			}};
			var modalInstance = $uibModal.open(ctrl.myModal);
			modalInstance.result.then(function (selectedItem) {
			}, function () {
			});
		};

		ctrl.doDelete = function () {
			var noCheckedItems=[];
			angular.forEach(ctrl.news,function(item){
				if(!item.checked){
					noCheckedItems.push(item);
				}
			});
			if(noCheckedItems.length==ctrl.news.length)return;
			ctrl.myModal.templateUrl="app/news/deleteNews.html";
			ctrl.myModal.resolve={result:function(){
				var result={};
				result.type="doDelete";
				result.data=noCheckedItems;
				return result;
			}};
			var modalInstance = $uibModal.open(ctrl.myModal);
			modalInstance.result.then(function (response) {
				ctrl.news=response.noCheckedItems;
			}, function () {
			});
		};

	}]).controller('newsModalCtrl', function ($uibModalInstance,result) {
		var ctrl = this;
		if(result.type=="doEdit"){
			ctrl.item=result.data;
			ctrl.item.isHot==true?ctrl.item.isHot="true":ctrl.item.isHot="false";
		}else if(result.type=="doDelete"){
			ctrl.noCheckedItems=result.data;
		}


		ctrl.ok = function () {
			$uibModalInstance.close(ctrl);
		};

		ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	});
