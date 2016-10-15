"use strict";

angular.module('app')
    .directive('selectNode',function(){
        return {
            restrict:'E',
            scope:{
                model:'='
            },
            template:'<div class="zTreeDemoBackground"><ul id="treeDemo" class="ztree"></ul></ul>',
            replace:true,
            link:function(scope){
                scope.setting = {
                    check: {
                        enable: true
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view:{
                        fontCss:{'font-weight':'500'}
                    }
                };

                $.fn.zTree.init($("#treeDemo"), scope.setting, scope.model);
            }
        }
    });


