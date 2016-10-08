//包装函数
module.exports=function(grunt){

    //任务配置，所有插件配置信息
    grunt.initConfig({

        //获取 packge.json的信息
        pkg:grunt.file.readJSON('package.json'),

        karma: {
            unit: {
                configFile: 'test/karma.config.js'
            }
        }
    });

    //告诉grunt当我们在终端输入grunt时需要做什么
    grunt.registerTask('default',[]);
    grunt.loadNpmTasks('grunt-karma');
};