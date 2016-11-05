"use strict";

angular.module('app')
    .directive('summerNote',function(){
        return {
            restrict:'A',
            require: 'ngModel',
            link:function(scope, ele, attrs, ngModel){
                ele.summernote({
                    lang: 'zh-CN',
                    height:300
                });

                scope.$watch(function(){return ngModel.$modelValue;},function(){
                    ele.summernote('code', ngModel.$modelValue);
                })
            }
        }
    });


