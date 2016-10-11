"use strict";

angular.module('app')
    .directive('pagination',function(){
        return {
            restrict:'E',
            scope:{
                numPages:'=',
                currentPage:'='
            },
            templateUrl:'common/directive/pagination/pagination.html',
            replace:true,
            link:function(scope){

            }
        }
    });


