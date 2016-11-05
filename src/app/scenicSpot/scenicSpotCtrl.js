"use strict";

angular.module('app',['ui.select2'])
	.controller('scenicSpotCtrl', ['$http', '$uibModal','$ocLazyLoad','$sce', function ($http, $uibModal,$ocLazyLoad,$sce) {
		var ctrl = this;

		ctrl.checked=false;

		$http({
			url: 'data/scenicSpot/scenicSpot.json',
			method: 'get'
		}).then(function (response) {
			ctrl.scenicSpots = response.data;
			angular.forEach(ctrl.scenicSpots,function(scenicSpot){
				scenicSpot.content = $sce.trustAsHtml(scenicSpot.content);
			});

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
			ctrl.myModal.templateUrl="app/scenicSpot/addScenicSpotOne.html";
			ctrl.myModal.size='lg';
			ctrl.myModal.resolve={result:function(){
				var result={};
				result.type="doAddOne";
				return result;
			}};
			var modalInstance = $uibModal.open(ctrl.myModal);

			modalInstance.result.then(function (response){
				ctrl.myModal.templateUrl="app/scenicSpot/addScenicSpotTwo.html";
				ctrl.myModal.size='lg';
				ctrl.myModal.resolve={result:function(){
					var result={};
					result.data=response;
					result.type="doAddTwo";
					return result;
				}};
				var modalInstance = $uibModal.open(ctrl.myModal);
				return modalInstance.result
			}).then(function (response){
				if(response.todo=="addOne"){
					ctrl.doAdd();
				}
			});
		};

		ctrl.doDelete = function () {
			var noCheckedscenicSpots=[];
			angular.forEach(ctrl.scenicSpots,function(scenicSpot){
				if(!scenicSpot.checked){
					noCheckedscenicSpots.push(scenicSpot);
				}
			});
			if(noCheckedscenicSpots.length==ctrl.scenicSpots.length)return;
			ctrl.myModal.templateUrl="app/scenicSpot/deleteScenicSpot.html";
			ctrl.myModal.resolve={result:function(){
				var result={};
				result.type="doDelete";
				result.data=noCheckedscenicSpots;
				return result;
			}};
			var modalInstance = $uibModal.open(ctrl.myModal);
			modalInstance.result.then(function (response) {
				ctrl.scenicSpots=response.noCheckedscenicSpots;
			});
		};




		ctrl.doEdit = function (scenicSpot) {
			ctrl.doAdd();
		};

		ctrl.site = function (address) {
			ctrl.myModal.templateUrl="app/scenicSpot/siteScenicSpot.html";
			ctrl.myModal.size='lg';
			ctrl.myModal.resolve={result:function(){
				var result={};
				result.type="site";
				result.address=address;
				return result;
			}};
			$uibModal.open(ctrl.myModal);
		};


	}]).controller('scenicSpotModalCtrl', function ($scope,$uibModalInstance,result) {
		var ctrl = this;

		ctrl.show=function(address){
			window.setTimeout(function(){
				var map = new BMap.Map("container");
				map.enableScrollWheelZoom(true);
				map.centerAndZoom(address, 15);
			},10);
		};

		ctrl.ok = function (todo) {
			if(todo=='addOne') {
				ctrl.todo='addOne';
			}else if(todo=='addTwo'){
				ctrl.todo='addTwo';
			}
			$uibModalInstance.close(ctrl);
		};

		ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

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

			for (var i = 0;i<ctrl.scenicSpot.images.length; i++) {
				ctrl.addSlide(ctrl.scenicSpot.images[i]);
			}
		}else if(result.type=="doAddOne"){
			ctrl.months=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
		}else if(result.type=="doAddTwo"){

		}else if(result.type=="doDelete"){
			ctrl.noCheckedscenicSpots=result.data;
		}else if(result.type=="site"){
			ctrl.show(result.address);
		}


	});
