module.exports = function(grunt){
	grunt.initConfig({
		concat: {
			js: {
				src: [
					'js/core.js', 
					'js/msgtool.js',
					'js/swfobject.js',
					'js/tools.js',
					'js/template.js',
					'js/messagebar.js'
				],
				dest: 'js/scsms.js'
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat']);

};
