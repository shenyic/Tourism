"use strict";

angular.module('app')
    .directive('site',function($compile){
        return {
            restrict:'AE',
            template:'<div id="container" style="position:absolute;height: 400px;width: 400px;margin: 20px auto"></div>',
            replace:true,
            link:function(scope,element,attr){
               var address=scope.$eval(attr.address);
                alert($('#container'));
                var map = new BMap.Map("container");

                map.centerAndZoom(address, 15);
                //map.addEventListener("tilesloaded",function(){alert();});
                map.enableScrollWheelZoom(true);

            }
        }
    });


