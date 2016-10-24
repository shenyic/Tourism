"use strict";

angular.module('app')
    .directive('sidebar',function($location,$http){
        return {
            restrict:'AE',
            templateUrl:'common/directive/sidebar/sidebar.html',
            replace:true,
            link:function(scope){
                $http({
                    url:'data/sidebar/sidebar.json',
                    method:'get'
                }).then(function(response){
                    scope.list=response.data;
                });


                scope.changeSize=function($event){
                    if($($event.target).hasClass('closed')){
                        $('.navbar-side').animate({left: '0px'});
                        $($event.target).removeClass('closed');
                        $('#page-wrapper').animate({'margin-left' : '260px'});
                    }
                    else{
                        $($event.target).addClass('closed');
                        $('.navbar-side').animate({left: '-260px'});
                        $('#page-wrapper').animate({'margin-left' : '0px'});
                    }
                };

                $(window).bind("load resize", function () {
                    if ($(this).width() < 768) {
                        $('div.sidebar-collapse').addClass('collapse')
                    } else {
                        $('div.sidebar-collapse').removeClass('collapse')
                    }
                    $('#page-wrapper').css({"height":window.innerHeight-55+"px"});
                });

                scope.$watch(function() {
                    return $location.path();
                },function(newValue){
                    scope.path=newValue;
                });
            }
        }
    });


