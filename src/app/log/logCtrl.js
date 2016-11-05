"use strict";

angular.module('app')
	.controller('logCtrl', ['$scope','$http', '$uibModal', function ($scope,$http, $uibModal) {
		var ctrl = this;

		ctrl.popup1 = {
			opened: false
		};

		ctrl.popup2 = {
			opened: false
		};

		$http({
			url: 'data/log/log.json',
			method: 'get'
		}).then(function (response) {
			ctrl.logs = response.data;
		});

		ctrl.dateOptions = {
			formatYear: 'yy',
			maxDate: new Date(),
			startingDay: 1
		};

		ctrl.open1 = function() {
			ctrl.popup1.opened = true;
		};

		ctrl.open2 = function() {
			ctrl.popup2.opened = true;
		};




	}]);
