module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({

        less: {
			options: {
				paths: ["css"],
				plugins: [
					new (require('less-plugin-autoprefix'))({browsers: ["chrome > 10", "firefox > 10", "ie > 7", "android > 2", "ios > 5"]}),
				]
			},
			build: {
				files: {
					"css/build/main.css": ["css/main.less"] // destination file and source file
				}
			}
        },

        watch: {
			css: {
				files: ['css/*.less'],
				tasks: ['less:build']
			},

			options: {
				atBegin: true
			}
        },

		postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ["chrome > 10", "firefox > 10", "ie > 7", "android > 2", "ios > 5"]
                    })
                ]
            },
            dist: {
                src: 'css/build/*.css'
            }
        }

        // @TODO Add minify css task
    });

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('default', [
		'less',
		'watch',
		'postcss'
	]);
};
