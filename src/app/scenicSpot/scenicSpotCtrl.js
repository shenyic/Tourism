"use strict";

angular.module('app',['ui.select2'])
	.controller('scenicSpotCtrl', ['$http', '$uibModal','$ocLazyLoad', function ($http, $uibModal,$ocLazyLoad) {
		var ctrl = this;

		ctrl.checked=false;


		$http({
			url: 'data/scenicSpot/scenicSpot.json',
			method: 'get'
		}).then(function (response) {
			ctrl.scenicSpots = response.data;
		});

		ctrl.onCheck=function(){
			if(ctrl.checked){
				angular.forEach(ctrl.scenicSpots,function(scenicSpot){
					scenicSpot.checked=true;
				});
			}else{
				angular.forEach(ctrl.scenicSpots,function(scenicSpot){
					scenicSpot.checked=false;
				})
			}
		};

		ctrl.myModal={
			animation: true,
			backdrop:"static",
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			controller: 'scenicSpotModalCtrl',
			controllerAs: 'ctrl'
		};


		ctrl.look = function (scenicSpot) {
			ctrl.myModal.templateUrl="app/scenicSpot/detail.html";
			ctrl.myModal.size='lg';
			ctrl.myModal.resolve={result:function(){
				var result={};
				result.type="look";
				result.data=scenicSpot;
				return result;
			}};
			$uibModal.open(ctrl.myModal);
		};

		ctrl.doAdd = function () {
			ctrl.myModal.templateUrl="app/scenicSpot/addScenicSpot.html";
			ctrl.myModal.size='lg';
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

		/*ctrl.doDelete = function () {
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
		};*/


		/*

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

		*/

	}]).controller('scenicSpotModalCtrl', function ($scope,$uibModalInstance,result) {
		var ctrl = this;
		if(result.type=="look"){
			var currIndex = 0;
			var url="data/scenicSpot/";

			ctrl.scenicSpot=result.data;
			ctrl.slides = [];
			ctrl.addSlide = function(image) {
				ctrl.slides.push({
					image: url+image,
					id: currIndex++
				});
			};

			ctrl.show=function(address){
				window.setTimeout(function(){
					var map = new BMap.Map("container");
					map.enableScrollWheelZoom(true);
					map.centerAndZoom(address, 15);
				},10);
			};
			for (var i = 0;i<ctrl.scenicSpot.images.length; i++) {
				ctrl.addSlide(ctrl.scenicSpot.images[i]);
			}
		}else if(result.type=="doAdd"){
			ctrl.months=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
		}
		/*if(angular.isUndefined(result.type)){
			ctrl.power=result.data;
		}else if(result.type=="doEdit"){
			ctrl.user=result.data;
		}else if(result.type=="doDelete"){
			ctrl.noCheckedUsers=result.data;
		}*/

		//var slides = $scope.slides = [];
		//var currIndex = 0;

		/*$scope.addSlide = function() {
			var newWidth = 600 + slides.length + 1;
			slides.push({
				image: '//unsplash.it/' + newWidth + '/300',
				text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
				id: currIndex++
			});
		};

		for (var i = 0; i < 4; i++) {
			$scope.addSlide();
		}*/

		// Randomize logic below



		ctrl.ok = function () {
			$uibModalInstance.close(ctrl);
		};

		ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	});
